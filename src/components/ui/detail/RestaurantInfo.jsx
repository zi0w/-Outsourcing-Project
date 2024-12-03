import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import supabase from '../../../supabase/supabase';
import Swal from 'sweetalert2';

const RestaurantInfo = ({ id }) => {
  const queryClient = useQueryClient();

  const userId = '073b37db-9e7a-4d24-a2fd-7bfae432ae33'; // 로그인한 유저

  const getRestaurantData = async (id) => {
    let { data: restaurants, error } = await supabase.from('restaurants').select('*').eq('id', id).single();
    return restaurants;
  };

  const { data, isPending, isError } = useQuery({
    queryKey: ['restaurant', id],
    queryFn: () => getRestaurantData(id)
  });

  const getLikesData = async () => {
    let { data: likes, error } = await supabase.from('likes').select('*').eq('restaurant_id', id);
    return likes;
  };

  const { data: likes } = useQuery({
    queryKey: ['like', id],
    queryFn: getLikesData
  });

  const liked = likes?.some((like) => like.user_id === userId); // 이미 좋아요 했는지 여부

  const handleInsertlike = async (userId, restaurantId) => {
    if (liked) {
      const { data, error } = await supabase
        .from('likes')
        .delete()
        .eq('user_id', userId)
        .eq('restaurant_id', restaurantId);
      return data;
    } else {
      const { data, error } = await supabase
        .from('likes')
        .insert([{ user_id: userId, restaurant_id: restaurantId }])
        .select();
      return data;
    }
  };

  const { mutate: handleUpdateLike } = useMutation({
    mutationFn: () => handleInsertlike(userId, id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['like', id] });

      const previousLikes = queryClient.getQueryData(['like', id]);

      if (!liked) {
        queryClient.setQueryData(['like', id], (old) => old.filter((like) => like.user_id !== userId));
      } else {
        queryClient.setQueryData(['like', id], (old) => [
          ...old,
          {
            id: Date.now().toString(),
            user_id: userId,
            restaurant_id: id,
            created_at: new Date()
          }
        ]);
      }

      return { previousLikes };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(['like', id], context.previousLikes);
      Swal.fire({
        icon: 'error',
        title: '매장 좋아요를 실패했습니다.',
        text: '잠시 후 다시 시도해주세요.'
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['like', id] });
      Swal.fire({
        icon: 'success',
        title: liked ? '좋아요가 취소되었습니다.' : '매장 좋아요를 성공했습니다.',
        text: '마이페이지에서 좋아요한 매장을 확인할 수 있습니다.'
      });
    }
  });

  if (isPending) {
    return <div>로딩 중..</div>;
  }

  if (isError) {
    return <div>에러 발생...</div>;
  }

  return (
    <div className="w-full h-[200px] rounded-[24px] bg-red-200">
      <div className="ml-[40px] p-2 flex flex-col gap-[5px] relative">
        <EmptyHeart liked={liked} onClick={handleUpdateLike} />
        <h3 className="text-lg font-[600]">{data.name}</h3>
        <p className="text-[12px]">{data.chef_name} 셰프</p>
        <p className="text-[12px]">주소 : {data.address}</p>
        <p className="text-[12px]">브레이크 타임: {data.break_time ? data.break_time : '없음'}</p>
        {data.day_off.length > 0 ? (
          <p className="text-[12px]">
            휴무 :
            {data.day_off.map((day, index) => (
              <span className="mx-1" key={index}>
                {day},
              </span>
            ))}
          </p>
        ) : (
          <p className="text-[12px]">휴무 없음</p>
        )}
        {data.operating_time.length > 1 ? (
          <p className="text-[12px]">
            평일 : {data.operating_time[0]}, 주말 : {data.operating_time[1]}
          </p>
        ) : (
          <p className="text-[12px]">평일.주말 : {data.operating_time[0]}</p>
        )}
      </div>
    </div>
  );
};

export default RestaurantInfo;

const EmptyHeart = ({ liked, onClick }) => {
  return (
    <svg
      onClick={() => onClick()}
      fill={liked ? 'red' : null}
      className="w-[30px] h-30px absolute top-3 right-3 cursor-pointer"
      id="Layer_1_1_"
      version="1.1"
      viewBox="0 0 16 16"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8.612,2.347L8,2.997l-0.612-0.65c-1.69-1.795-4.43-1.795-6.12,0c-1.69,1.795-1.69,4.706,0,6.502l0.612,0.65L8,16  l6.12-6.502l0.612-0.65c1.69-1.795,1.69-4.706,0-6.502C13.042,0.551,10.302,0.551,8.612,2.347z" />
    </svg>
  );
};
