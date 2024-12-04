import { useQuery } from '@tanstack/react-query';

import Swal from 'sweetalert2';

import supabase from '../supabase/supabase';

const useDetailMap = (id) => {
  const getRestorantAddress = async (restaurantId) => {
    const { data, error } = await supabase
      .from('restaurants')
      .select('name, address, description, phone_number')
      .eq('id', restaurantId)
      .single();

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
    data: mapData,
    isPending,
    isError
  } = useQuery({
    queryKey: ['map', id],
    queryFn: () => getRestorantAddress(id)
  });

  return { mapData, isPending, isError };
};

export default useDetailMap;
