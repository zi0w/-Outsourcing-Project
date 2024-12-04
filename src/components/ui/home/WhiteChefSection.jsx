import React from 'react';
import WhiteChefCardList from './WhiteChefCards';

const WhiteChefSection = () => {
  return (
    <section className="w-full text-[#fff] pt-[100px] pb-[150px]">
      <div className="">
        <h2 className="text-center text-[26px] font-medium  mb-[40px]">백수저 셰프님 식당 목록 </h2>
        <WhiteChefCardList />
        <p className="text-center mt-[60px] text-[21px] font-Medium">
          사진을 클릭하면 셰프님들의 가게 위치를 지도에서 확인하실 수 있습니다.
        </p>
      </div>
    </section>
  );
};

export default WhiteChefSection;
