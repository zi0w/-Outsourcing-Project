const SearchButtons = ({ handleColorType, colorFilter }) => {
  return (
    <div className="flex flex-row gap-[8.35px] drop-shadow-md">
      <button
        value={'all'}
        onClick={handleColorType}
        className={`w-[50px] h-[20px] border border-black flex justify-center items-center text-[13px] rounded-[5px] ${colorFilter === 'all' ? 'bg-black text-white' : 'bg-white'}`}
      >
        전체
      </button>
      <button
        value={'black'}
        onClick={handleColorType}
        className={`w-[50px] h-[20px] border border-black flex justify-center items-center text-[13px] rounded-[5px] ${colorFilter === 'black' ? 'bg-black text-white' : 'bg-white'}`}
      >
        흑
      </button>
      <button
        value={'white'}
        onClick={handleColorType}
        className={`w-[50px] h-[20px] border border-black flex justify-center items-center text-[13px] rounded-[5px] ${colorFilter === 'white' ? 'bg-black text-white' : 'bg-white'}`}
      >
        백
      </button>
      <span className="text-[13px]">으로 검색하기</span>
    </div>
  );
};

export default SearchButtons;
