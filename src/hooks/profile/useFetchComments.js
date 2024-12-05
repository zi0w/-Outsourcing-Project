import { useCallback } from 'react';

import { useQuery } from '@tanstack/react-query';

import supabase from '../../supabase/supabase';

export const useFetchComments = (userId) => {
  // supabase comments 테이블 정보 가져오기 API 함수
  const fetchComments = useCallback(async () => {
    const { data: comments, error } = await supabase.from('comments').select('*').eq('user_id', userId);
    if (error) {
      console.error('리뷰 가져오기 에러:', error);
      return [];
    }

    // 로그인한 유저가 작성한 리뷰에 매장 정보를 추가
    const getRestaurantComments = await Promise.all(
      comments.map(async (comment) => {
        const { data: restaurant, error: restaurantError } = await supabase
          .from('restaurants')
          .select('*')
          .eq('id', comment.restaurant_id)
          .single();

        if (restaurantError) {
          console.error(restaurantError);
          return { ...comment, restaurant: null };
        }

        return { ...comment, restaurant };
      })
    );
    return getRestaurantComments;
  }, [userId]);

  // tanstack query를 사용하여 유저가 작성한 리뷰 데이터 fetch
  const {
    data: comments,
    isPending: commentsPending,
    isError: commentsError
  } = useQuery({
    queryKey: ['getRestaurantComments'],
    queryFn: fetchComments
  });

  return { comments, commentsPending, commentsError };
};
