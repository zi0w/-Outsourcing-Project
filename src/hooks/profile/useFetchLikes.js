import { useQuery } from '@tanstack/react-query';
import supabase from '../../supabase/supabase';

export const useFetchLikes = (userId) => {
  // supabase likes 테이블 정보 가져오기 API 함수
  const fetchLikes = async () => {
    const { data: likes, error } = await supabase.from('likes').select('*').eq('user_id', userId);
    if (error) {
      console.error('좋아요 가져오기 에러:', error);
      return [];
    }

    // 로그인한 유저가 좋아요 한 매장의 추가 정보를 데이터에 추가
    const getLikeRestaurants = await Promise.all(
      likes.map(async (like) => {
        const { data: restaurants, error: restaurantsError } = await supabase
          .from('restaurants')
          .select('*')
          .eq('id', like.restaurant_id)
          .single();

        if (restaurantsError) {
          console.error(restaurantsError);
          return { ...like, restaurant: null }; //
        }
        return { ...like, restaurants };
      })
    );
    return getLikeRestaurants;
  };
  // tanstack query를 이용하여 유저가 좋아요 한 매장의 데이터를 fetch
  const {
    data: likes,
    isPending: likesPending,
    isError: likesError
  } = useQuery({
    queryKey: ['likesRestaurants'],
    queryFn: fetchLikes
  });

  return { likes, likesPending, likesError };
};
