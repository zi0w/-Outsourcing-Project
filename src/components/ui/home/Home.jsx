import React from 'react';
import BlackChefTiles from './BlackChefTiles';
import WhiteChefTiles from './WhiteChefTiles';

const Home = () => {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero-image h-[700px] w-full bg-no-repeat bg-[0px_-260px], bg-cover indent-[-9999em]">
        Hero_section
      </section>

      {/* BlackChefCards*/}
      <section className="bg-gradient-45-white">
        <BlackChefTiles />
      </section>

      {/* WhiteChefCards */}
      <section>
        <WhiteChefTiles />
      </section>
    </>
  );
};

export default Home;
