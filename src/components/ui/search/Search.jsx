const Search = () => {
  return (
    <div className="bg-[#0E0E0E] ">
      <div className="max-w-[1440px] w-full h-screen p-[40px] m-auto flex flex-row gap-[40px]">
        <div className="max-w-[520px] bg-[#F9F9F9] border rounded-[24px] h-full p-[20px]">
          <div className="flex flex-row gap-[8.35px] drop-shadow-md">
            <button className="w-[50px] h-[20px] border border-black border-[2px] flex justify-center items-center text-[13px] rounded-[5px] bg-white">
              전체
            </button>
            <button className="w-[50px] h-[20px] border border-black border-[2px] flex justify-center items-center text-[13px] rounded-[5px] bg-black text-white">
              흑
            </button>
            <button className="w-[50px] h-[20px] border border-black border-[1px] flex justify-center items-center text-[13px] rounded-[5px] bg-white">
              백
            </button>
            <span className="text-[13px]">으로 검색하기</span>
          </div>
          <div className="w-[480px] h-[40px] border border-[3px] border-[#3396FF] rounded-[10px] bg-white mt-3 drop-shadow-md flex items-center justify-around">
            <input type="text" className="w-10/12 outline-none" />
            <button className="bg-search-icon w-[24px] h-[24px]"></button>
          </div>
          <ul className="mt-[20px] flex flex-col gap-[20px] overflow-auto">
            <li className="w-full h-[100px] border drop-shadow-md rounded-[16px] bg-white flex flex-row p-5 cursor-pointer transition-transform hover:-translate-y-1 duration-500 items-center justify-between">
              <div>
                <h2 className="font-bold text-lg text-gray-800 mb-1">남영탉</h2>
                <p className="text-sm text-gray-600 break-words">서울 강남구 강남대로 123</p>
                <p className="text-sm text-gray-600 break-words">02-333-1234</p>
              </div>
              <div>
                <span className="border border-black rounded-full p-2 w-[30px] h-[30px] flex items-center justify-center bg-black text-white">
                  >
                </span>
              </div>
            </li>
            <li className="w-full h-[100px] border drop-shadow-md rounded-[16px] bg-white flex flex-row p-5 cursor-pointer transition-transform hover:-translate-y-1 duration-500 items-center justify-between">
              <div>
                <h2 className="font-bold text-lg text-gray-800 mb-1">남영탉</h2>
                <p className="text-sm text-gray-600 break-words">서울 강남구 강남대로 123</p>
                <p className="text-sm text-gray-600 break-words">02-333-1234</p>
              </div>
              <div>
                <span className="border border-black rounded-full p-2 w-[30px] h-[30px] flex items-center justify-center bg-black text-white">
                  >
                </span>
              </div>
            </li>
            <li className="w-full h-[100px] border drop-shadow-md rounded-[16px] bg-white flex flex-row p-5 cursor-pointer transition-transform hover:-translate-y-1 duration-500 items-center justify-between">
              <div>
                <h2 className="font-bold text-lg text-gray-800 mb-1">남영탉</h2>
                <p className="text-sm text-gray-600 break-words">서울 강남구 강남대로 123</p>
                <p className="text-sm text-gray-600 break-words">02-333-1234</p>
              </div>
              <div>
                <span className="border border-black rounded-full p-2 w-[30px] h-[30px] flex items-center justify-center bg-black text-white">
                  >
                </span>
              </div>
            </li>
            <li className="w-full h-[100px] border drop-shadow-md rounded-[16px] bg-white flex flex-row p-5 cursor-pointer transition-transform hover:-translate-y-1 duration-500 items-center justify-between">
              <div>
                <h2 className="font-bold text-lg text-gray-800 mb-1">남영탉</h2>
                <p className="text-sm text-gray-600 break-words">서울 강남구 강남대로 123</p>
                <p className="text-sm text-gray-600 break-words">02-333-1234</p>
              </div>
              <div>
                <span className="border border-black rounded-full p-2 w-[30px] h-[30px] flex items-center justify-center bg-black text-white">
                  >
                </span>
              </div>
            </li>
            <li className="w-full h-[100px] border drop-shadow-md rounded-[16px] bg-white flex flex-row p-5 cursor-pointer transition-transform hover:-translate-y-1 duration-500 items-center justify-between">
              <div>
                <h2 className="font-bold text-lg text-gray-800 mb-1">남영탉</h2>
                <p className="text-sm text-gray-600 break-words">서울 강남구 강남대로 123</p>
                <p className="text-sm text-gray-600 break-words">02-333-1234</p>
              </div>
              <div>
                <span className="border border-black rounded-full p-2 w-[30px] h-[30px] flex items-center justify-center bg-black text-white">
                  >
                </span>
              </div>
            </li>
            <li className="w-full h-[100px] border drop-shadow-md rounded-[16px] bg-white flex flex-row p-5 cursor-pointer transition-transform hover:-translate-y-1 duration-500 items-center justify-between">
              <div>
                <h2 className="font-bold text-lg text-gray-800 mb-1">남영탉</h2>
                <p className="text-sm text-gray-600 break-words">서울 강남구 강남대로 123</p>
                <p className="text-sm text-gray-600 break-words">02-333-1234</p>
              </div>
              <div>
                <span className="border border-black rounded-full p-2 w-[30px] h-[30px] flex items-center justify-center bg-black text-white">
                  >
                </span>
              </div>
            </li>
          </ul>
        </div>
        <div className="max-w-[794px] w-[794px] bg-red-200 h-full rounded-[24px]">
          <h1></h1>
        </div>
      </div>
    </div>
  );
};

export default Search;
