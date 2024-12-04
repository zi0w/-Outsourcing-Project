import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import supabase from '../../supabase/supabase';
import defaultImg from '../../assets/images/profile/default_img.jpg';
import useAuthStore from '../../store/authStore';
import Swal from 'sweetalert2';

const ProfilePage = () => {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user); //zustand의 로그인 user 정보
  const [tab, setTab] = useState('likes'); // 탭을 likes로 기본값 설정
  const [newProfileImg, setNewProfileImg] = useState(''); // 새로 업로드한 이미지 상태
  const [newNickname, setNewNickname] = useState(''); // 새로 입력한 닉네임 상태

  // 프로필 이미지 업로드 함수
  const handleImageChange = async (files) => {
    const file = files[0];

    // 파일을 선택하지 않은 경우 함수 종료
    if (!file) {
      return;
    }

    // 브라우저에서 업로드된 파일의 임시 URL 생성
    const tempImgUrl = URL.createObjectURL(file);

    // UI에 즉시 반영 (낙관적)
    setNewProfileImg(tempImgUrl);

    // supabase storage에 이미지 업로드
    const { data } = await supabase.storage.from('profile_img').upload(`profile_img${Date.now()}.png`, file);
    const newImg = `https://zvnqewxnkcdqqlskzqlz.supabase.co/storage/v1/object/public/profile_img/${data.path}`;

    setNewProfileImg(newImg); // 업로드 된 이미지 URL로 상태 업데이트
  };

  // 프로필 정보 변경
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 닉네임 입력이 비어있는 경우 예외 처리
    if (!newNickname.trim()) {
      Swal.fire({
        icon: 'error',
        title: '닉네임을 입력해주세요.',
        confirmButtonColor: '#d33'
      });
      return;
    }

    // sweetalert
    const result = await Swal.fire({
      icon: 'warning',
      title: '프로필을 변경하시겠습니까?',
      showCancelButton: true,
      confirmButtonColor: '#429f50',
      cancelButtonColor: '#d33',
      confirmButtonText: '변경',
      cancelButtonText: '취소'
    });

    if (result.isConfirmed) {
      // Supabase에 업데이트 요청
      await updateUserInfo(user.id);

      // 성공 메시지 sweetalert
      Swal.fire({
        icon: 'success',
        title: '프로필 변경 성공!',
        confirmButtonColor: '#429f50'
      });
    }
  };

  // supabase users 테이블 업데이트
  const updateUserInfo = async (currentUserId) => {
    const { error } = await supabase
      .from('users')
      .update({
        profile_image_url: newProfileImg,
        nickname: newNickname
      })
      .eq('id', currentUserId);

    if (error) {
      console.error('유저 정보 업데이트 에러:', error);
    } else {
      // zustand 상태 업데이트 및 캐시 무효화
      useAuthStore.getState().updateProfile(newNickname, newProfileImg);
      queryClient.invalidateQueries(['users', currentUserId]);
    }
  };

  // supabase comments 테이블 삭제 API 함수
  const deleteComment = async (CommentId) => {
    const { error } = await supabase.from('comments').delete().eq('id', CommentId);
    if (error) console.error('리뷰 삭제 에러:', error);
  };

  // tanstack query로 supabase comments 테이블 상태 관리
  const handleCommentDelete = useMutation({
    // 댓글 삭제 API 함수 호출
    mutationFn: (commentId) => deleteComment(commentId),
    onSuccess: () => {
      // 삭제 성공 시, 캐시 무효화
      queryClient.invalidateQueries(['comments', user.id]);
    }
  });

  // 리뷰 삭제 sweetalert
  const confirmDeleteComment = (commentId) => {
    Swal.fire({
      icon: 'warning',
      title: '정말 삭제하시겠습니까?',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '삭제',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.isConfirmed) {
        handleCommentDelete.mutate(commentId);
        Swal.fire({
          icon: 'success',
          title: '삭제 완료!',
          confirmButtonColor: '#429f50'
        });
      }
    });
  };

  // supabase likes 테이블 삭제 API 함수
  const deleteLike = async (likeId) => {
    const { error } = await supabase.from('likes').delete().eq('id', likeId);
    if (error) console.error('좋아요 삭제 에러:', error);
  };

  // tanstack query로 supabase likse 테이블 상태 관리
  const handleLikeDelete = useMutation({
    mutationFn: (likeId) => deleteLike(likeId),
    onSuccess: () => {
      //성공 시, 캐시 무효화
      queryClient.invalidateQueries([`likes`, user.id]);
    }
  });

  // 좋아요 매장 삭제 sweetalert
  const confirmDeleteLike = (likeId) => {
    Swal.fire({
      icon: 'warning',
      title: '정말 삭제하시겠습니까?',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '삭제',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.isConfirmed) {
        handleLikeDelete.mutate(likeId);
        Swal.fire({
          icon: 'success',
          title: '즐겨찾기 삭제 완료!',
          confirmButtonColor: '#429f50'
        });
      }
    });
  };

  // supabase likes 테이블 정보 가져오기 API 함수
  const fetchLikes = async ({ queryKey }) => {
    const [, userId] = queryKey;
    const { data: likes, error } = await supabase.from('likes').select('*').eq('user_id', userId);
    if (error) {
      console.error('좋아요 가져오기 에러:', error);
      return [];
    }

    // 로그인한 유저가 좋아요 한 매장의 추가 정보를 데이터에 추가
    const getLikeRestaurants = await Promise.all(
      likes.map(async (like) => {
        const { data: restaurants, error: restaurantsError } = await supabase
          .from('restaurants')
          .select('*')
          .eq('id', like.restaurant_id)
          .single();

        if (restaurantsError) {
          console.error(restaurantsError);
          return { ...like, restaurant: null }; //
        }
        return { ...like, restaurants };
      })
    );
    return getLikeRestaurants;
  };

  // tanstack query를 이용항여 유저가 좋아요 한 매장의 데이터를 fetch
  const {
    data: likes,
    isPending: likesPending,
    isError: likesError
  } = useQuery({
    queryKey: ['likesRestaurants', user.id],
    queryFn: fetchLikes
  });

  // supabase comments 테이블 정보 가져오기 API 함수
  const fetchComments = async ({ queryKey }) => {
    const [, userId] = queryKey;
    const { data: comments, error } = await supabase.from('comments').select('*').eq('user_id', userId);
    if (error) {
      console.error('리뷰 가져오기 에러:', error);
      return [];
    }

    // 로그인한 유저가 작성한 리뷰에 매장 정보를 추가
    const getRestaurantComments = await Promise.all(
      comments.map(async (comment) => {
        const { data: restaurant, error: restaurantError } = await supabase
          .from('restaurants')
          .select('*')
          .eq('id', comment.restaurant_id)
          .single();

        if (restaurantError) {
          console.error(restaurantError);
          return { ...comment, restaurant: null };
        }

        return { ...comment, restaurant };
      })
    );
    return getRestaurantComments;
  };

  // tanstack query를 사용하여 유저가 작성한 리뷰 데이터 fetch
  const {
    data: comments,
    isPending: commentsPending,
    isError: commentsError
  } = useQuery({
    queryKey: ['getRestaurantComments', user.id],
    queryFn: fetchComments
  });

  useEffect(() => {
    let tempUrl;
    // newProfileImg가 file객체인 경우 URL 생성
    if (newProfileImg instanceof File) {
      tempUrl = URL.createObjectURL(newProfileImg);
    }

    // 언마운트 시, 메모리 해제
    return () => {
      if (tempUrl) {
        URL.revokeObjectURL(tempUrl);
      }
    };
  }, [newProfileImg]);

  return (
    // 유저 프로필 정보
    <section className="h-[calc(100vh-163px)] text-white flex-col items-center pt-36">
      <div className="text-center">
        <label htmlFor="imgFile" className="relative group cursor-pointer block w-[138px] h-[138px] mx-auto">
          <img
            src={newProfileImg || user.profile_image_url || defaultImg}
            alt="프로필 사진"
            className="w-full h-full object-cover rounded-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
            <span className="text-white text-4xl font-bold">+</span>
          </div>
        </label>
        <input
          id="imgFile"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleImageChange(e.target.files)}
        />
        <h1 className="text-black mt-[20px] text-white font-medium text-[20px]">{user.nickname}</h1>
      </div>

      {/* nav */}
      <div className="flex text-white mx-auto w-[1000px] my-[30px] text-[18px] rounded-[38px] font-medium">
        <button
          className={`w-[400px] py-2 rounded-s-[38px] text-center hover:bg-[#2B2B2B] ${tab === 'likes' ? 'bg-[#2B2B2B]' : 'bg-[#070707]'}`}
          onClick={() => setTab('likes')}
        >
          좋아요 한 매장
        </button>
        <button
          className={`w-[400px] py-2 text-center hover:bg-[#2B2B2B] ${tab === 'comments' ? 'bg-[#2B2B2B]' : 'bg-[#070707]'}`}
          onClick={() => setTab('comments')}
        >
          리뷰
        </button>
        <button
          className={`w-[400px] py-2 text-center hover:bg-[#2B2B2B] rounded-e-[38px] ${tab === 'profile' ? 'bg-[#2B2B2B]' : 'bg-[#070707]'}`}
          onClick={() => setTab('profile')}
        >
          프로필 변경
        </button>
      </div>

      {/* 좋아요 매장 리스트 */}
      <div className="flex justify-center text-center mx-auto overflow-x-hidden">
        {tab === 'likes' && (
          <>
            {likesPending ? (
              <p className="font-semibold">로딩 중..</p>
            ) : likesError ? (
              <p className="font-semibold">북마크 데이터를 가져오는 중 에러가 발생하였습니다.</p>
            ) : (
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
                      <li
                        key={like.id}
                        className="w-[700px] p-4 flex flex-col items-start rounded-xl mb-8 text-black bg-white"
                      >
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
            )}
          </>
        )}

        {/* 리뷰 리스트 */}
        {tab === 'comments' && (
          <>
            {commentsPending ? (
              <p className="font-semibold">로딩 중..</p>
            ) : commentsError ? (
              <p className="font-semibold">댓글 불러오기 오류 발생..</p>
            ) : (
              <div
                className="mt-10 overflow-y-auto overflow-x-hidden h-[280px] pr-2 
                          [&::-webkit-scrollbar]:w-2
                          [&::-webkit-scrollbar-track]:bg-gray-100
                          [&::-webkit-scrollbar-thumb]:bg-gray-300
                          dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                          dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
              >
                <ul>
                  {comments.length > 0 ? (
                    comments.map((comment) => (
                      <li
                        key={comment.id}
                        className="w-[700px] p-4 flex flex-col items-start rounded-xl mb-8 text-black bg-white"
                      >
                        <div className="flex items-center">
                          <img
                            src={newProfileImg || user.profile_image_url || defaultImg}
                            className="w-12 h-12 rounded-full"
                            alt="프로필 사진"
                          />
                          <div className="pl-3 flex flex-col justify-start">
                            <h1 className="font-semibold text-start">{comment.restaurant?.name}</h1>
                            <p>{comment.comment}</p>
                          </div>
                        </div>

                        {/* 타임 스탬프 */}
                        <div className="w-full flex justify-between items-center pl-[60px] mt-2">
                          <p className="">
                            {new Date(comment.created_at).toLocaleDateString('ko-KR', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>

                          {/* 삭제 버튼 */}
                          <button type="button" onClick={() => confirmDeleteComment(comment.id)}>
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
                    <h1>등록한 리뷰가 없습니다.</h1>
                  )}
                </ul>
              </div>
            )}
          </>
        )}

        {/* 프로필 변경 탭 */}
        {tab === 'profile' && (
          <form onSubmit={handleSubmit} className="rounded-xl flex flex-col items-center">
            <div className="w-[500px] flex flex-col items-start mt-4">
              <label className="text-[18px] mb-2">닉네임 변경</label>
              <input
                type="text"
                value={newNickname}
                placeholder="변경하실 닉네임을 입력해주세요."
                className="mt-1 block text-black w-full bg-white border border-gray-700 rounded-xl p-2 border-none pl-4"
                onChange={(e) => setNewNickname(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-[120px] mt-10 bg-[#EC4C4C] text-lg py-[6px] rounded-3xl hover:bg-[#B73838] font-semibold"
            >
              변경 하기
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ProfilePage;
