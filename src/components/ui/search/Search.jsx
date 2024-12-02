import { useQuery } from '@tanstack/react-query';
import SearchMap from '../../features/SearchMap';
import supabase from '../../../supabase/supabase';
import { useState } from 'react';
import SearchList from './SearchList';

const Search = () => {
  const [colorFilter, setColorFilter] = useState('all');
  console.log(colorFilter);

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
    queryFn: fetchRestaurantData
  });

  if (isPending) return <div>로딩 중...</div>;
  if (error) {
    console.error(error);
    return <div>에러가 발생했습니다: {error.message}</div>;
  }

  // 버튼 클릭에 따라 컬러 필터 상태 변경
  const handleColorType = (e) => {
    setColorFilter(e.target.value);
  };

  // 상태에 따라 다르게 필터를 돌려 레스토랑 데이터 뽑기
  const filterdRestaurants = () => {
    switch (colorFilter) {
      case 'all':
        return restaurants;
      case 'black':
        return restaurants.filter((restaurant) => restaurant.color === 'black');
      case 'white':
        return restaurants.filter((restaurant) => restaurant.color === 'white');
    }
  };

  return (
    <div className="bg-[#0E0E0E] h-screen">
      <div className="max-w-[1440px] w-full h-full p-[40px] m-auto flex flex-row gap-[40px]">
        <div className="max-w-[520px] bg-[#F9F9F9] border rounded-[24px] h-full p-[20px] flex flex-col">
          <div className="flex flex-row gap-[8.35px] drop-shadow-md">
            <button
              value={'all'}
              onClick={handleColorType}
              className="w-[50px] h-[20px] border border-black border-[2px] flex justify-center items-center text-[13px] rounded-[5px] bg-white"
            >
              전체
            </button>
            <button
              value={'black'}
              onClick={handleColorType}
              className="w-[50px] h-[20px] border border-black border-[2px] flex justify-center items-center text-[13px] rounded-[5px] bg-black text-white"
            >
              흑
            </button>
            <button
              value={'white'}
              onClick={handleColorType}
              className="w-[50px] h-[20px] border border-black border-[1px] flex justify-center items-center text-[13px] rounded-[5px] bg-white"
            >
              백
            </button>
            <span className="text-[13px]">으로 검색하기</span>
          </div>
          <div className="w-[480px] h-[40px] border border-[3px] border-[#3396FF] rounded-[10px] bg-white mt-3 drop-shadow-md flex items-center justify-around">
            <input type="text" className="w-10/12 outline-none" />
            <button className="bg-search-icon w-[24px] h-[24px]"></button>
          </div>
          <ul className="mt-[20px] flex flex-col gap-[20px] overflow-auto">
            {filterdRestaurants().map((restaurant) => {
              return <SearchList key={restaurant.id} restaurant={restaurant} />;
            })}
          </ul>
        </div>
        <div className="max-w-[794px] w-[794px] bg-[#F9F9F9] h-full rounded-[24px]">
          <SearchMap />
        </div>
      </div>
    </div>
  );
};

export default Search;
