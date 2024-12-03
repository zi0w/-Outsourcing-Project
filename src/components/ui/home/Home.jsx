import React from 'react';
import BlackChefTiles from './BlackChefTiles';
import WhiteChefTiles from './WhiteChefTiles';
import ChefsSection from './ChefsSection';

const Home = () => {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero-image h-[700px] w-full bg-no-repeat bg-[0px_-260px], bg-cover indent-[-9999em]">
        Hero_section
      </section>

      {/* BlackChefCards*/}
      <section className="bg-gradient-45-white ">
        <BlackChefTiles />

        {/* props에 맞는 데이터 값으로 바꾼 후 하나로 통일하기 */}
        <ChefsSection />
      </section>

      {/* WhiteChefCards */}
      <section className="">
        <WhiteChefTiles />

        {/* props에 맞는 데이터 값으로 바꾼 후 하나로 통일하기 */}
        <ChefsSection />
      </section>
    </>
  );
};

export default Home;
