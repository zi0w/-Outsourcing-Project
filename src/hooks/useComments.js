import { useQuery } from '@tanstack/react-query';
import supabase from '../supabase/supabase';

const useComments = (id) => {
  const getCommentDatas = async (restaurantId) => {
    let { data } = await supabase
      .from('comments')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .order('created_at', { ascending: false });

    return data;
  };

  const {
    data: restaurantComments,
    isPending,
    isError
  } = useQuery({
    queryKey: ['comments', id],
    queryFn: () => getCommentDatas(id),
    staleTime: 5 * 1000
  });

  return { restaurantComments, isPending, isError };
};

export default useComments;
