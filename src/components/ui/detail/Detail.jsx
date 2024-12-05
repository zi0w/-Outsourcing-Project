import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import CommentForm from '../../features/CommentForm';
import DetailMap from '../../features/DetailMap';

import Comments from './Comments';
import RestaurantInfo from './RestaurantInfo';

const Detail = () => {
  const { id } = useParams();

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <section>
      <div className="m-auto max-w-[1440px] w-full h-[calc(100vh-65px)]">
        <div className="w-full h-full p-[40px] flex flex-row gap-[40px]">
          {/* 식당 정보 */}
          <div className="max-w-[520px] w-full flex flex-col gap-[40px]">
            <RestaurantInfo id={id} />

            <div className="w-full h-full rounded-[24px] px-[40px] pt-[38.12px] pb-[35.77px] bg-white overflow-hidden relative">
              <CommentForm id={id} />
              <Comments id={id} />
            </div>
          </div>

          {/* 식당 위치 */}
          <DetailMap id={id} />
        </div>
      </div>
    </section>
  );
};

export default Detail;
