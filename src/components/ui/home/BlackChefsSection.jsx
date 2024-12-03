import React from 'react';
import BlackChefTiles from './BlackChefTiles';

const BlackChefsSection = () => {
  return (    
      <section className="bg-gradient-45-white mt-[300px] w-full h-[1000px] pt-[150px] ">
        <div className="">
          <h2 className="text-center text-[26px] font-bold  mb-[40px]">흑수저 셰프님 식당 목록 </h2>
          <BlackChefTiles />
          <p className="text-center mt-[60px] text-[21px] font-Medium">
            사진을 클릭하면 셰프님들의 가게 위치를 지도에서 확인하실 수 있습니다.
          </p>
        </div>
      </section>    
  );
};

export default BlackChefsSection;
