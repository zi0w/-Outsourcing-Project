import Swal from 'sweetalert2';

import useAuthStore from '../../../store/authStore';

import useLike from '../../../hooks/useLike';

const RestaurantInfo = ({ id }) => {
  const user = useAuthStore((state) => state.user);

  const { restaurants, isPending, isError, liked, handleUpdateLike } = useLike(id, user);

  console.log(restaurants);
  const handleLikeUpdate = () => {
    if (!user) {
      Swal.fire({
        icon: 'info',
        title: '로그인 후 좋아요를 눌러주세요.',
        text: '로그인/회원가입을 통해 즐겨보세요.'
      });
    } else {
      handleUpdateLike();
    }
  };

  if (isPending) {
    return <div>로딩 중..</div>;
  }

  if (isError) {
    return <div>에러 발생...</div>;
  }

  return (
    <div className="w-full h-[200px] rounded-[24px] border relative overflow-hidden flex justify-between gap-[5px]  text-white ">
      <EmptyHeart liked={liked} onClick={handleLikeUpdate} />
      <div className="w-[50%] flex flex-col items-start justify-center pl-6">
        <h3 className="text-lg font-[600]">{restaurants.name}</h3>
        <p className="text-[12px]">{restaurants.chef_name} 셰프</p>
        <p className="text-[12px]">주소 : {restaurants.address}</p>
        <p className="text-[12px]">브레이크 타임: {restaurants.break_time ? restaurants.break_time : '없음'}</p>
        {restaurants.day_off.length > 0 ? (
          <p className="text-[12px]">
            휴무 :
            {restaurants.day_off.map((day, index) => (
              <span className="mx-1" key={index}>
                {day},
              </span>
            ))}
          </p>
        ) : (
          <p className="text-[12px]">휴무 없음</p>
        )}
        {restaurants.operating_time.length > 1 ? (
          <p className="text-[12px]">
            평일 : {restaurants.operating_time[0]}, 주말 : {restaurants.operating_time[1]}
          </p>
        ) : (
          <p className="text-[12px]">평일.주말 : {restaurants.operating_time[0]}</p>
        )}
      </div>
      <div
        className={
          restaurants.color === 'white'
            ? 'w-[50%] bg-no-repeat bg-[length:500px] bg-top'
            : 'w-[50%] bg-no-repeat bg-[center_top_-2rem] bg-[length:320px]'
        }
        style={{ backgroundImage: `url(${restaurants.image_url})` }}
      />
    </div>
  );
};

export default RestaurantInfo;

const EmptyHeart = ({ liked, onClick }) => {
  return (
    <svg
      onClick={() => onClick()}
      fill={liked ? 'red' : 'white'}
      className="w-[30px] h-30px absolute top-3 right-3 cursor-pointer"
      id="Layer_1_1_"
      version="1.1"
      viewBox="0 0 16 16"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8.612,2.347L8,2.997l-0.612-0.65c-1.69-1.795-4.43-1.795-6.12,0c-1.69,1.795-1.69,4.706,0,6.502l0.612,0.65L8,16  l6.12-6.502l0.612-0.65c1.69-1.795,1.69-4.706,0-6.502C13.042,0.551,10.302,0.551,8.612,2.347z" />
    </svg>
  );
};
