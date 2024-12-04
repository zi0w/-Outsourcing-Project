const filterRestaurantInfo = (restaurantInfo, color) => {  

  return restaurantInfo.filter((item) => item.color === color)  

}

export default filterRestaurantInfo;
