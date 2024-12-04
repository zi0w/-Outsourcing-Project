import { useState } from 'react';

const useRestaurantFilters = (restaurants) => {
  const [colorFilter, setColorFilter] = useState('all');
  const [searchText, setSearchText] = useState('');

  // 버튼 클릭에 따라 컬러 필터 상태(카테고리별 매장 필터링) + 선택된 버튼 상태 변경(선택 버튼 이펙트)
  const handleColorType = (e) => setColorFilter(e.target.value);

  const handleSearch = (e) => setSearchText(e.target.value);

  // 상태에 따라 다르게 필터를 돌려 레스토랑 데이터 뽑기
  const filteredRestaurants = () => {
    let filtered = restaurants;

    // 검색 필터 적용
    if (searchText.trim() !== '') {
      filtered = filtered.filter((restaurant) => restaurant.name.includes(searchText));
    }

    // 색상 필터 적용
    switch (colorFilter) {
      case 'black':
        return filtered.filter((restaurant) => restaurant.color === 'black');
      case 'white':
        return filtered.filter((restaurant) => restaurant.color === 'white');
      case 'all':
      default:
        return filtered;
    }
  };
  return { handleColorType, colorFilter, searchText, handleSearch, filteredRestaurants };
};

export default useRestaurantFilters;
