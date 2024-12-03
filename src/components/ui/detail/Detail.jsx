import Comments from './Comments';

import CommentForm from '../../features/CommentForm';

const Detail = () => {
  return (
    <section>
      <div className="m-auto max-w-[1440px] w-full h-screen bg-orange-300">
        <div className="w-full h-full p-[40px] flex flex-row gap-[40px]">
          {/* 식당 정보 */}
          <div className="max-w-[520px] w-full flex flex-col gap-[40px]">
            <div className="w-full h-[200px] rounded-[24px] bg-red-200">
              <div className="ml-[40px] p-2 flex flex-col gap-[5px]">
                <h3 className="text-lg font-[600]">식당 네오</h3>
                <p className="text-[12px]">최강록 셰프</p>
                <p className="text-[12px]">서울 송파구 삼전로12길 4 101호</p>
                <p className="text-[12px]">브레이크 타임</p>
                <p className="text-[12px]">휴무: 매주 일요일, 매주 월요일</p>
                <p className="text-[12px]">영업시간 : 18:00 ~ 21:00</p>
                <Heart />
              </div>
            </div>

            <div className="w-full h-[760px] rounded-[24px] px-[40px] pt-[38.12px] pb-[35.77px] bg-white overflow-hidden">
              {/* <div>
                <h4 className="text-lg font-[600]">리뷰</h4>

                <form>
                  <textarea
                    placeholder="리뷰를 입력해주세요."
                    className="mt-[9.86px] p-3 text-sm max-w-[440px] w-full h-[142.97px] rounded-[16px] border-none outline-none shadow-md resize-none"
                  />
                  <button
                    type="sumbit"
                    className="mt-[18.73px] w-full h-[47.66px] border-none bg-[#EC4C4C] rounded-[16px] text-white font-[600] hover:bg-[#B73838] transition-all"
                  >
                    리뷰 작성하기
                  </button>
                </form>
              </div> */}
              <CommentForm id={'0c67a5e8-eef2-4995-a5bf-a14d6910ad0a'} />

              {/* <div className="mt-[30px] border-t-2 border-[#AAAAAA]">
                <div className="p-2 flex flex-col gap-[27px] mt-[8px] max-h-[300px] overflow-y-auto">
                  <div className="w-full min-h-[120px] p-2 rounded-[16px] border-none shadow-md flex flex-row items-center justify-center gap-[9.98px]">
                    <img alt="User Profile" className="w-[60px] h-[60px] bg-red-400 rounded-full" />
                    <div>
                      <div className="flex items-center justify-between">
                        <h5 className="text-base font-[600]">아이디 혹은 이메일</h5>
                        <p className="text-[12px] text-slate-300">2024. 12. 01, 11:36</p>
                      </div>
                      <div className="mt-[6.67px] flex items-center justify-between">
                        <p className="text-sm">나야 들기름...멘트 실제로 들어보고 싶어서 갔어요!</p>
                      </div>
                      <div className="mt-[8px] flex gap-2 items-center justify-end">
                        <button className="w-[50px] h-[30px] border-none outline-none rounded-[5px] text-white text-sm bg-blue-600">
                          수정
                        </button>
                        <button className="w-[50px] h-[30px] border-none outline-none rounded-[5px] text-white text-sm bg-red-600">
                          삭제
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              <Comments id={'0c67a5e8-eef2-4995-a5bf-a14d6910ad0a'} />
            </div>
          </div>

          {/* 식당 위치 */}
          <div className="w-full h-full rounded-[24px] bg-red-500">여긴 지도</div>
        </div>
      </div>
    </section>
  );
};

export default Detail;

const Heart = () => {
  return (
    <svg
      height="512px"
      id="Layer_1"
      version="1.1"
      viewBox="0 0 512 512"
      width="512px"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M340.8,98.4c50.7,0,91.9,41.3,91.9,92.3c0,26.2-10.9,49.8-28.3,66.6L256,407.1L105,254.6c-15.8-16.6-25.6-39.1-25.6-63.9  c0-51,41.1-92.3,91.9-92.3c38.2,0,70.9,23.4,84.8,56.8C269.8,121.9,302.6,98.4,340.8,98.4 M340.8,83C307,83,276,98.8,256,124.8  c-20-26-51-41.8-84.8-41.8C112.1,83,64,131.3,64,190.7c0,27.9,10.6,54.4,29.9,74.6L245.1,418l10.9,11l10.9-11l148.3-149.8  c21-20.3,32.8-47.9,32.8-77.5C448,131.3,399.9,83,340.8,83L340.8,83z" />
    </svg>
  );
};
