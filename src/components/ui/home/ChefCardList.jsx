import { useRef } from 'react';

import Slider from 'react-slick';

import ChefCardItem from './ChefCardItem';
import SliderSelector from './SliderSelector';

import { BlackCustomNextArrow, BlackCustomPrevArrow, WhiteCustomNextArrow, WhiteCustomPrevArrow } from './CustomArrows';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ChefCardList = ({ restaurants, color }) => {
  const sliderRef = useRef(null);

  const filteredInfo = restaurants.filter((item) => item.color === color);

  // slider settings
  const whiteSettings = {
    dots: false, // 하단 인디케이터 표시
    infinite: true, // 무한 반복
    speed: 700, // 슬라이드 전환 속도
    slidesToShow: 3, // 한 화면에 보여줄 슬라이드 수
    slidesToScroll: 3, // 한 번에 스크롤할 슬라이드 수
    prevArrow: <BlackCustomPrevArrow />,
    nextArrow: <BlackCustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024, // 화면 크기가 1024px 이하일 때
        settings: {
          slidesToShow: 2 // 슬라이드 2개 표시
        }
      },
      {
        breakpoint: 640, // 화면 크기가 640px 이하일 때
        settings: {
          slidesToShow: 1 // 슬라이드 1개 표시
        }
      }
    ]
  };

  const blackSettings = {
    dots: false, // 하단 인디케이터 표시
    infinite: true, // 무한 반복
    speed: 700, // 슬라이드 전환 속도
    slidesToShow: 3, // 한 화면에 보여줄 슬라이드 수
    slidesToScroll: 3, // 한 번에 스크롤할 슬라이드 수
    prevArrow: <WhiteCustomPrevArrow />,
    nextArrow: <WhiteCustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024, // 화면 크기가 1024px 이하일 때
        settings: {
          slidesToShow: 2 // 슬라이드 2개 표시
        }
      },
      {
        breakpoint: 640, // 화면 크기가 640px 이하일 때
        settings: {
          slidesToShow: 1 // 슬라이드 1개 표시
        }
      }
    ]
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* selector */}
      <div className="mb-10 flex justify-center">
        <SliderSelector color={color} filteredInfo={filteredInfo} sliderRef={sliderRef} />
      </div>

      {/* Slider */}
      <div className=" mx-auto max-w-[1440px] ">
        <Slider ref={sliderRef} {...(color === 'black' ? whiteSettings : blackSettings)}>
          {/* ChefCard */}
          {filteredInfo.map((info) => (
            <ChefCardItem key={info.id} info={info} color={color} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ChefCardList;
