import { useState } from 'react';
import useRestaurants from '../../../hooks/useDetailRestaurant';
import ChefCardList from './ChefCardList';
import Loading from '../common/Loading';

const BlackChefCardList = () => {
  const { restaurantInfo, isError, isPending } = useRestaurants();
  const [color, setColor] = useState('black');

  if (isPending) {
    return <Loading/>
  }

  if (isError) {
    return <p>오류가 발생했습니다.</p>;
  }

  return <ChefCardList restaurantInfo={restaurantInfo} color={color} />;
};

export default BlackChefCardList;
