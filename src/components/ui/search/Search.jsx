import { useState } from 'react';

import SearchMap from '../../features/SearchMap';

import SearchList from './SearchList';
import SearchButtons from './SearchButtons';

import useRestaurants from '../../../hooks/useRestaurants';
import useRestaurantFilters from '../../../hooks/useRestaurantFilters';

import Loading from '../common/Loading';

const Search = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null); // 지도에 선택된 가게 포커싱 하기 위한 상태
  const { restaurants, isPending, error } = useRestaurants();
  const { handleColorType, colorFilter, searchText, handleSearch, filteredRestaurants } =
    useRestaurantFilters(restaurants);

  if (isPending) return <Loading />;
  if (error) {
    console.error(error);
    return <div>에러가 발생했습니다: {error.message}</div>;
  }

  return (
    <div className="h-[calc(100vh-65px)]">
      <div className="max-w-[1440px] w-full h-full p-[40px] m-auto flex flex-row gap-[40px]">
        <div className="max-w-[520px] bg-[#F9F9F9] border rounded-[24px] h-full p-[20px] flex flex-col">
          <SearchButtons handleColorType={handleColorType} colorFilter={colorFilter} />
          <div className="w-[480px] h-[40px] p-3 border-[3px] border-[#3396FF] rounded-[10px] bg-white mt-3 drop-shadow-md flex items-center justify-around">
            <input type="text" value={searchText} onChange={handleSearch} className="w-10/12 outline-none" />
            <button className="bg-search-icon w-[24px] h-[24px]"></button>
          </div>
          <ul
            className="mt-[20px] flex flex-col gap-[20px] overflow-auto [&::-webkit-scrollbar]:w-2
[&::-webkit-scrollbar-track]:bg-gray-100
[&::-webkit-scrollbar-thumb]:bg-gray-300
dark:[&::-webkit-scrollbar-track]:bg-neutral-700
dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
          >
            {filteredRestaurants().map((restaurant) => {
              return (
                <SearchList key={restaurant.id} restaurant={restaurant} setSelectedRestaurant={setSelectedRestaurant} />
              );
            })}
          </ul>
        </div>
        <div className="max-w-[794px] w-[794px] bg-[#F9F9F9] h-full rounded-[24px]">
          <SearchMap selectedRestaurant={selectedRestaurant} />
        </div>
      </div>
    </div>
  );
};

export default Search;
