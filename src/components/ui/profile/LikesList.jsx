import { useDeleteLike } from '../../../hooks/profile/useDeleteLike';

import defaultImg from '../../../assets/images/profile/default_img.jpg';

const LikesList = ({ likes, newProfileImg }) => {
  const { confirmDeleteLike, user } = useDeleteLike();
  return (
    <div
      className="mt-10 overflow-y-auto overflow-x-hidden h-[280px] pr-2 
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:bg-gray-100
            [&::-webkit-scrollbar-thumb]:bg-gray-300
            dark:[&::-webkit-scrollbar-track]:bg-neutral-700
            dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
    >
      <ul className="">
        {likes.length > 0 ? (
          likes.map((like) => (
            <li key={like.id} className="w-[700px] p-4 flex flex-col items-start rounded-xl mb-8 text-black bg-white">
              <div className="flex items-center">
                <img
                  src={newProfileImg || user.profile_image_url || defaultImg}
                  className="w-12 h-12 rounded-full"
                  alt="프로필 사진"
                />
                <div className="pl-3 flex flex-col justify-start">
                  <h1 className="font-semibold text-start">{like.restaurants?.name}</h1>
                  <p>{like.restaurants?.address}</p>
                </div>
              </div>

              {/* 영업 시간 */}
              <div className="flex w-full justify-between items-center pl-[60px] mt-2">
                {like.restaurants?.operating_time.length > 1 ? (
                  <div className="flex gap-3">
                    <p>평일:{like.restaurants?.operating_time[0]}</p>
                    <p>주말:{like.restaurants?.operating_time[1]}</p>
                  </div>
                ) : (
                  <p>평일,주말:{like.restaurants?.operating_time[0]}</p>
                )}

                {/* 삭제 버튼 */}
                <button type="button" onClick={() => confirmDeleteLike(like.id)}>
                  <svg
                    className="hover:fill-[#EC4C4C]"
                    height="20px"
                    version="1.1"
                    viewBox="0 0 48 48"
                    width="18px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="Expanded">
                      <g>
                        <g>
                          <path d="M41,48H7V7h34V48z M9,46h30V9H9V46z" />
                        </g>
                        <g>
                          <path d="M35,9H13V1h22V9z M15,7h18V3H15V7z" />
                        </g>
                        <g>
                          <path d="M16,41c-0.553,0-1-0.447-1-1V15c0-0.553,0.447-1,1-1s1,0.447,1,1v25C17,40.553,16.553,41,16,41z" />
                        </g>
                        <g>
                          <path d="M24,41c-0.553,0-1-0.447-1-1V15c0-0.553,0.447-1,1-1s1,0.447,1,1v25C25,40.553,24.553,41,24,41z" />
                        </g>
                        <g>
                          <path d="M32,41c-0.553,0-1-0.447-1-1V15c0-0.553,0.447-1,1-1s1,0.447,1,1v25C33,40.553,32.553,41,32,41z" />
                        </g>
                        <g>
                          <rect height="2" width="48" y="7" />
                        </g>
                      </g>
                    </g>
                  </svg>
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center">좋아요 한 매장이 없습니다.</p>
        )}
      </ul>
    </div>
  );
};

export default LikesList;
