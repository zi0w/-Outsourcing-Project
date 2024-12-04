import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import Swal from 'sweetalert2';

import supabase from '../supabase/supabase';

const useLike = (id, user) => {
  const queryClient = useQueryClient();

  const getRestaurantData = async (id) => {
    let { data, error } = await supabase.from('restaurants').select('*').eq('id', id).single();

    if (error) {
      Swal.fire({
        icon: 'error',
        title: '데이터를 가져올 수 없습니다.',
        text: '잠시 후 다시 시도해 주세요.'
      });

      return;
    }

    return data;
  };

  const getLikesData = async () => {
    let { data, error } = await supabase.from('likes').select('*').eq('restaurant_id', id);

    if (error) {
      Swal.fire({
        icon: 'error',
        title: '데이터를 가져올 수 없습니다.',
        text: '잠시 후 다시 시도해 주세요.'
      });

      return;
    }

    return data;
  };

  const {
    data: restaurants,
    isPending,
    isError
  } = useQuery({
    queryKey: ['restaurant', id],
    queryFn: () => getRestaurantData(id)
  });

  const { data: likes } = useQuery({
    queryKey: ['like', id],
    queryFn: getLikesData
  });

  const liked = likes?.some((like) => like.user_id === user.id);

  const handleInsertlike = async (userId, restaurantId) => {
    if (liked) {
      const { data, error } = await supabase
        .from('likes')
        .delete()
        .eq('user_id', userId)
        .eq('restaurant_id', restaurantId);

      if (error) {
        Swal.fire({
          icon: 'error',
          title: '데이터 삭제 중 에러가 발생했습니다.',
          text: '잠시 후 다시 시도해 주세요.'
        });

        return;
      }

      return data;
    } else {
      const { data, error } = await supabase
        .from('likes')
        .insert([{ user_id: userId, restaurant_id: restaurantId }])
        .select();

      if (error) {
        Swal.fire({
          icon: 'error',
          title: '데이터를 추가할 수 없습니다.',
          text: '잠시 후 다시 시도해 주세요.'
        });

        return;
      }
      return data;
    }
  };

  const { mutate: handleUpdateLike } = useMutation({
    mutationFn: () => handleInsertlike(user.id, id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['like', id] });

      const previousLikes = queryClient.getQueryData(['like', id]);

      if (!liked) {
        queryClient.setQueryData(['like', id], (old) => old.filter((like) => like.user_id !== user.id));
      } else {
        queryClient.setQueryData(['like', id], (old) => [
          ...old,
          {
            id: Date.now().toString(),
            user_id: user.id,
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

  return { restaurants, isPending, isError, liked, handleUpdateLike };
};

export default useLike;
