import React from 'react';
import { Link } from 'react-router-dom';

const ChefCardItem = ({ info, color }) => {
  return (
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
      <h3 className={`text-center text-[21px] mt-4 ${color === 'black' ? 'font-bold' : 'font-medium'}`}>{info.name}</h3>
    </div>
  );
};

export default ChefCardItem;
