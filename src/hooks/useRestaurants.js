import { useQuery } from '@tanstack/react-query';
import supabase from '../supabase/supabase';

const useRestaurants = () => {
  const fetchRestaurantData = async () => {
    const { data } = await supabase.from('restaurants').select('*');
    return data;
  };

  const {
    data: restaurants,
    isPending,
    error
  } = useQuery({
    queryKey: ['restaurants'],
    queryFn: fetchRestaurantData,
    staleTime: Infinity
  });

  return { restaurants, isPending, error };
};

export default useRestaurants;
