import SearchMap from '../../features/SearchMap';
import SearchList from './SearchList';
import SearchButtons from './SearchButtons';
import useRestaurants from '../../../hooks/useRestaurants';
import useRestaurantFilters from '../../../hooks/useRestaurantFilters';
import { useState } from 'react';

const Search = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null); // 지도에 선택된 가게 포커싱 하기 위한 상태
  const { restaurants, isPending, error } = useRestaurants();
  const { handleColorType, colorFilter, searchText, handleSearch, filterdRestaurants } =
    useRestaurantFilters(restaurants);

  if (isPending) return <div>로딩 중...</div>;
  if (error) {
    console.error(error);
    return <div>에러가 발생했습니다: {error.message}</div>;
  }

  return (
    <div className="bg-[#0E0E0E] h-screen">
      <div className="max-w-[1440px] w-full h-full p-[40px] m-auto flex flex-row gap-[40px]">
        <div className="max-w-[520px] bg-[#F9F9F9] border rounded-[24px] h-full p-[20px] flex flex-col">
          <SearchButtons handleColorType={handleColorType} colorFilter={colorFilter} />
          <div className="w-[480px] h-[40px] p-3 border border-[3px] border-[#3396FF] rounded-[10px] bg-white mt-3 drop-shadow-md flex items-center justify-around">
            <input type="text" value={searchText} onChange={handleSearch} className="w-10/12 outline-none" />
            <button className="bg-search-icon w-[24px] h-[24px]"></button>
          </div>
          <ul className="mt-[20px] flex flex-col gap-[20px] overflow-auto">
            {filterdRestaurants().map((restaurant) => {
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
