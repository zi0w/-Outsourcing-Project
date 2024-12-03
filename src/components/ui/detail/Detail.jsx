import Comments from './Comments';

import CommentForm from '../../features/CommentForm';
import DetailMap from '../../features/DetailMap';
import RestaurantInfo from './RestaurantInfo';

const Detail = () => {
  return (
    <section>
      <div className="m-auto max-w-[1440px] w-full h-screen bg-black">
        <div className="w-full h-full p-[40px] flex flex-row gap-[40px]">
          {/* 식당 정보 */}
          <div className="max-w-[520px] w-full flex flex-col gap-[40px]">
            <RestaurantInfo id={'0c67a5e8-eef2-4995-a5bf-a14d6910ad0a'} />

            <div className="w-full h-[760px] rounded-[24px] px-[40px] pt-[38.12px] pb-[35.77px] bg-white overflow-hidden">
              <CommentForm id={'0c67a5e8-eef2-4995-a5bf-a14d6910ad0a'} />
              <Comments id={'0c67a5e8-eef2-4995-a5bf-a14d6910ad0a'} />
            </div>
          </div>

          {/* 식당 위치 */}
          <DetailMap id={'0c67a5e8-eef2-4995-a5bf-a14d6910ad0a'} />
        </div>
      </div>
    </section>
  );
};

export default Detail;
