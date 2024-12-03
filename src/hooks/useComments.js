import { useQuery } from '@tanstack/react-query';

import Swal from 'sweetalert2';

import supabase from '../supabase/supabase';

const useComments = (id) => {
  const getCommentDatas = async (restaurantId) => {
    let { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .order('created_at', { ascending: false });

    if (error) {
      Swal.fire({
        icon: 'error',
        title: '데이터를 가져오는데 실패했습니다..',
        text: '잠시 후 다시 시도해 주세요.'
      });

      return;
    }

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
