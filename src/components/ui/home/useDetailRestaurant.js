import { useQuery } from '@tanstack/react-query';
import supabase from '../../../supabase/supabase';

// Supabase DB table에서 data 가져오는 함수

const useDetailRestaurant = () => {
  const FetchRestaurantInfo = async () => {
    const { data, error } = await supabase.from('restaurants').select('*');

    if (error) {
      throw new Error(error.message);
    }    
    return data;
  };

  const {
    data: restaurantInfo,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['restaurantInfo'],
    queryFn: () => FetchRestaurantInfo(),
    staleTime: Infinity
  });

  return {
    restaurantInfo,
    isLoading,
    isError
  };
};

export default useDetailRestaurant;
