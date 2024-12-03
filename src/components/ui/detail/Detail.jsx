import Comments from './Comments';

import CommentForm from '../../features/CommentForm';
import DetailMap from '../../features/DetailMap';

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
              <CommentForm id={'0c67a5e8-eef2-4995-a5bf-a14d6910ad0a'} />
              <Comments id={'0c67a5e8-eef2-4995-a5bf-a14d6910ad0a'} />
            </div>
          </div>

          {/* 식당 위치 */}
          {/* <div className="w-full h-full rounded-[24px] bg-red-500">여긴 지도</div> */}
          <DetailMap id={'0c67a5e8-eef2-4995-a5bf-a14d6910ad0a'} />
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
