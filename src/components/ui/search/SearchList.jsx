import React from 'react';

const SearchList = ({ restaurant }) => {
  return (
    <li className="w-full h-[100px] border drop-shadow-md rounded-[16px] bg-white flex flex-row p-5 cursor-pointer transition-transform hover:-translate-y-1 duration-500 items-center justify-between">
      <div>
        <h2 className="font-bold text-lg text-gray-800 mb-1">{restaurant.name}</h2>
        <p className="text-sm text-gray-600 break-words">{restaurant.address}</p>
        <p className="text-sm text-gray-600 break-words">{restaurant.phone_number}</p>
      </div>
      <div>
        <span className="border border-black rounded-full p-2 w-[30px] h-[30px] flex items-center justify-center bg-black text-white">
          >
        </span>
      </div>
    </li>
  );
};

export default SearchList;
