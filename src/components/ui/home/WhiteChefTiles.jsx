import React, { useState } from 'react';
import useDetailRestaurant from './useDetailRestaurant';
import ChefTiles from './ChefTiles';

const WhiteChefTiles = () => {
  const { restaurantInfo, isError, isLoading } = useDetailRestaurant();
  const [color, setColor] = useState('white');

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>오류가 발생했습니다.</p>;
  }

  return <ChefTiles restaurantInfo={restaurantInfo} color={color} />;
};

export default WhiteChefTiles;
