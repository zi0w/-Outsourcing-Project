import React, { useEffect, useRef, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { Link, useParams } from 'react-router-dom';
import filterRestaurantInfo from './filterRestaurantInfo';
import { CustomPrevArrow, CustomNextArrow } from './CustomArrows';

const ChefTiles = ({ restaurantInfo, color }) => {
  const filteredInfo = filterRestaurantInfo(restaurantInfo, color);
  const [currentRestaurant, setCurrentRestaurant] = useState(null);
  // 상세페이지로 이동하기 위한 useParams
  const { id } = useParams();

  // 슬라이더를 제어하기 위한 ref
  const sliderRef = useRef(null);

  // 상세페이지로 이동하기 위한 useParams
  useEffect(() => {
    const targetRestaurant = restaurantInfo.find((item) => item.id === id);
    setCurrentRestaurant(targetRestaurant);
  }, [id]);

  // slider settings
  const settings = {
    dots: false, // 하단 인디케이터 표시
    infinite: true, // 무한 반복
    speed: 700, // 슬라이드 전환 속도
    slidesToShow: 3, // 한 화면에 보여줄 슬라이드 수
    slidesToScroll: 3, // 한 번에 스크롤할 슬라이드 수
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
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

  // select handle
  const handleSlideChange = (e) => {
    const slideIndex = parseInt(e.target.value, 10) - 1;

    if (sliderRef.current) {
      sliderRef.current.slickGoTo(slideIndex);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-10 flex justify-center">
        <select
          id="slide-select"
          onChange={handleSlideChange}
          className={`
            ${color === 'black' ? `black-section-select-design` : `white-section-select-design`}`}
        >
          {filteredInfo.map((info, index) => (
            <option key={info.id} value={index}>
              {info.name}
            </option>
          ))}
        </select>
      </div>

      <div className=" mx-auto max-w-[1440px] ">
        <Slider ref={sliderRef} {...settings}>
          {filteredInfo.map((info) => (
            <div key={info.id} className="relative group w-full max-w-[320px] h-[320px] ml-8">
              <div>
                <div className="overflow-hidden rounded-[16px] w-[320px] h-[320px] shadow-[0_8px_8px_rgba(0,0,0,0.5)]">
                  <img src={info.image_url} alt={`${info.name}`} className="w-full h-full object-cover scale-110 " />
                </div>
              </div>
              <Link to={`/details/${info.id}`}>
                <div className="absolute top-0 left-0 w-[320px] h-[320px] bg-[rgba(0,0,0,0.7)] rounded-[16px] px-10 text-[#fff] opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-xl">
                  <div className="w-full h-auto mt-20">
                    <p className="text-[16px]">{info.description}</p>
                  </div>
                </div>
              </Link>
              <h3 className={`text-center text-[21px] mt-4 ${color === 'black' ? 'font-bold' : 'font-medium'}`}>
                {info.name}
              </h3>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ChefTiles;
