import { useState } from 'react';

import ChefCardList from './ChefCardList';
import Loading from '../common/Loading';

import useRestaurants from '../../../hooks/useRestaurants';

const BlackChefCardList = () => {
  const { restaurants, isError, isPending } = useRestaurants();
  const [color, setColor] = useState('black');

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <p>오류가 발생했습니다.</p>;
  }

  return <ChefCardList restaurants={restaurants} color={color} />;
};

export default BlackChefCardList;
