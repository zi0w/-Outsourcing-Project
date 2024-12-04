import { useState } from 'react';

import useRestaurants from '../../../hooks/useRestaurants';
import ChefCardList from './ChefCardList';
import Loading from '../common/Loading';

const WhiteChefCardList = () => {
  const { restaurantInfo, isError, isPending } = useRestaurants();
  const [color, setColor] = useState('white');

  if (isPending) {
    return <Loading/>;
  }

  if (isError) {
    return <p>오류가 발생했습니다.</p>;
  }

  return <ChefCardList restaurantInfo={restaurantInfo} color={color} />;
};

export default WhiteChefCardList;
