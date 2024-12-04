import React from 'react';

// 커스텀 Prev 버튼
const CustomPrevArrow = ({ onClick, color }) => {

  return (
    <button
      onClick={onClick}
      color={color}
      className={`w-8 h-8 flex items-center justify-center absolute top-1/2 left-[-20px] transform -translate-y-[100%]  text-white p-4 rounded-full shadow-[0px_2px_2px_rgba(0,0,0,0.3)]  z-30 
      ${color === 'black' ? 'bg-black text-white' : 'bag-white text-black '}`}
    >
      ←
    </button>
  );
};

// 커스텀 Next 버튼
const CustomNextArrow = ({ onClick, color }) => {
  return (
    <button
      onClick={onClick}
      color={color}
      className={`w-8 h-8 flex items-center justify-center absolute top-1/2 right-[-20px] transform -translate-y-[100%]  text-white p-4 rounded-full shadow-[0px_2px_2px_rgba(0,0,0,0.3)] z-30 
      ${color === 'black' ? 'bg-black text-white' : 'bag-white text-black '}`}
    >
      →
    </button>
  );
};

export { CustomPrevArrow, CustomNextArrow };
