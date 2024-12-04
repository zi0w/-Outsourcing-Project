import { useState } from 'react';
import useDetailRestaurant from './useDetailRestaurant';
import ChefCardList from './ChefCardList';

const BlackChefCardList = () => {
  const { restaurantInfo, isError, isLoading } = useDetailRestaurant();
  const [color, setColor] = useState('black');

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>오류가 발생했습니다.</p>;
  }

  return <ChefCardList restaurantInfo={restaurantInfo} color={color} />;
};

export default BlackChefCardList;
