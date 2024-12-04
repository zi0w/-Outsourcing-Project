import BlackChefCardList from './BlackChefCardList';

const BlackChefSection = () => {
  return (
    <section className="bg-gradient-45-white w-full pt-[100px] pb-[120px] ">
      <div className="">
        <h2 className="text-center text-[26px] font-bold mb-[40px]">흑수저 셰프님 식당 목록 </h2>
        <BlackChefCardList />
        <p className="text-center mt-[60px] text-[21px] font-bold">
          사진을 클릭하면 셰프님들의 가게 위치를 지도에서 확인하실 수 있습니다.
        </p>
      </div>
    </section>
  );
};

export default BlackChefSection;
