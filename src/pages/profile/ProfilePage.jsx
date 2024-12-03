import { useMutation, useMutationState, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import supabase from '../../supabase/supabase';
import defaultImg from '../../assets/images/profile/default_img.jpg';
import useAuthStore from '../../store/authStore';
import Swal from 'sweetalert2';

const ProfilePage = () => {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const [tab, setTab] = useState('likes');
  const [newProfileImg, setNewProfileImg] = useState('');
  const [newNickname, setNewNickname] = useState('');

  const handleImageChange = async (files) => {
    const file = files[0];

    if (!file) {
      return;
    }

    // 브라우저에서 업로드된 파일의 임시 URL 생성
    const tempImgUrl = URL.createObjectURL(file);

    // 낙관적으로 UI에 즉시 반영
    setNewProfileImg(tempImgUrl);

    const { data } = await supabase.storage.from('profile_img').upload(`profile_img${Date.now()}.png`, file);
    const newImg = `https://zvnqewxnkcdqqlskzqlz.supabase.co/storage/v1/object/public/profile_img/${data.path}`;
    setNewProfileImg(newImg);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //update user 함수 호출해서 매개변수로 로그인 유저정보 넘기기
    updateUserInfo(user.id);
    Swal.fire({
      icon: 'success',
      title: '프로필 변경 성공!',
      confirmButtonColor: '#429f50'
    });
  };

  // 유저 정보 업데이트
  const updateUserInfo = async (currentUserId) => {
    const { error } = await supabase
      .from('users')
      .update({
        profile_image_url: newProfileImg,
        nickname: newNickname
      })
      .eq('id', currentUserId);

    if (error) console.error('유저 정보 업데이트 에러:', error);
  };

  // 리뷰 삭제하기
  const deleteComment = async (CommentId) => {
    const { error } = await supabase.from('comments').delete().eq('id', CommentId);
    if (error) console.error('리뷰 삭제 에러:', error);
  };

  const handleCommentDelete = useMutation({
    mutationFn: (commentId) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', user.id]);
    }
  });

  // 좋아요 삭제하기
  const deleteLike = async (likeId) => {
    const { error } = await supabase.from('likes').delete().eq('id', likeId);
    if (error) console.error('좋아요 삭제 에러:', error);
  };

  const handleLikeDelete = useMutation({
    mutationFn: (likeId) => deleteLike(likeId),
    onSuccess: () => {
      queryClient.invalidateQueries([`likes`, user.id]);
    }
  });

  // 좋아요 가져오기
  const fetchLikes = async ({ queryKey }) => {
    const [_, userId] = queryKey;
    const { data: likes, error } = await supabase.from('likes').select('*').eq('user_id', userId);
    if (error) {
      console.error('좋아요 가져오기 에러:', error);
      return [];
    }

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

  const {
    data: likes,
    isPending: likesPending,
    isError: likesError
  } = useQuery({
    queryKey: ['likesRestaurants', user.id],
    queryFn: fetchLikes
  });

  // 리뷰 가져오기
  const fetchComments = async ({ queryKey }) => {
    const [_, userId] = queryKey;
    const { data: comments, error } = await supabase.from('comments').select('*').eq('user_id', userId);
    if (error) {
      console.error('리뷰 가져오기 에러:', error);
      return [];
    }

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

  const {
    data: comments,
    isPending: commentsPending,
    isError: commentsError
  } = useQuery({
    queryKey: ['getRestaurantComments', user.id],
    queryFn: fetchComments
  });

  // 로그인 유저 정보 가져오기
  // const getUerData = async () => {
  //   const { data, error } = await supabase.auth.getUser();
  //   if (error) console.error(error);
  //   return data;
  // };

  // const { data, isPending, isError } = useQuery({
  //   queryKey: ['user'],
  //   queryFn: getUerData
  // });

  // if (isPending) {
  //   return <div>로딩 중...</div>;
  // }

  // if (isError) {
  //   return <div>에러 발생...</div>;
  // }

  // console.log('유저 데이터:', data);

  // 시간 변경 함수
  const formatCustomDateTime = (writingTime) => {
    const date = new Date(writingTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

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
    <section className="h-[calc(100vh-230px)] text-white bg-gray-600 flex-col items-center">
      <div className="text-center">
        <img
          src={newProfileImg || user.profile_image_url || defaultImg}
          alt="프로필 사진"
          className="w-[138px] h-[138px] mx-auto rounded-full"
        />
        <h1 className="text-black mt-[20px] text-white font-bold text-[24px]">{user.nickname}</h1>
      </div>

      {/* nav */}
      <div className="flex text-white mx-auto w-[900px] my-[30px] rounded-[38px] font-semibold">
        <button
          className={`w-[400px] py-3 rounded-s-[38px] text-center hover:bg-[#2B2B2B] ${tab === 'likes' ? 'bg-[#2B2B2B]' : 'bg-[#070707]'}`}
          onClick={() => setTab('likes')}
        >
          좋아요 한 매장
        </button>
        <button
          className={`w-[400px] py-3 text-center hover:bg-[#2B2B2B] ${tab === 'comments' ? 'bg-[#2B2B2B]' : 'bg-[#070707]'}`}
          onClick={() => setTab('comments')}
        >
          리뷰
        </button>
        <button
          className={`w-[400px] py-3 text-center hover:bg-[#2B2B2B] rounded-e-[38px] ${tab === 'profile' ? 'bg-[#2B2B2B]' : 'bg-[#070707]'}`}
          onClick={() => setTab('profile')}
        >
          프로필 변경
        </button>
      </div>

      {/* content */}
      <div className="flex justify-center text-center mx-auto ">
        {tab === 'likes' && (
          <>
            {likesPending ? (
              <p className="font-semibold">로딩 중..</p>
            ) : likesError ? (
              <p className="font-semibold">북마크 데이터를 가져오는 중 에러가 발생하였습니다.</p>
            ) : (
              <div className="overflow-y-auto h-[300px]">
                <ul className="">
                  {likes.length > 0 ? (
                    likes.map((like) => (
                      <li
                        key={like.id}
                        className="w-[700px] p-5 flex flex-col items-start rounded-xl my-5 text-black bg-white"
                      >
                        <div className="flex items-center">
                          <img src={newProfileImg || defaultImg} className="w-12 h-12 rounded-full" alt="프로필 사진" />
                          <div className="pl-3 flex flex-col justify-start">
                            <h1 className="font-semibold text-start">{like.restaurants?.name}</h1>
                            <p>{like.restaurants?.address}</p>
                          </div>
                        </div>
                        <div className="flex w-full justify-between pl-[60px] mt-2">
                          {like.restaurants?.operating_time.length > 1 ? (
                            <div className="flex gap-3">
                              <p>평일:{like.restaurants?.operating_time[0]}</p>
                              <p>주말:{like.restaurants?.operating_time[1]}</p>
                            </div>
                          ) : (
                            <p>평일,주말:{like.restaurants?.operating_time[0]}</p>
                          )}
                          <button type="button" onClick={() => handleLikeDelete.mutate(like.id)}>
                            <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" className="w-5">
                              <path d="M432 80h-82.38l-34-56.75C306.1 8.827 291.4 0 274.6 0H173.4C156.6 0 141 8.827 132.4 23.25L98.38 80H16C7.125 80 0 87.13 0 96v16C0 120.9 7.125 128 16 128H32v320c0 35.35 28.65 64 64 64h256c35.35 0 64-28.65 64-64V128h16C440.9 128 448 120.9 448 112V96C448 87.13 440.9 80 432 80zM171.9 50.88C172.9 49.13 174.9 48 177 48h94c2.125 0 4.125 1.125 5.125 2.875L293.6 80H154.4L171.9 50.88zM352 464H96c-8.837 0-16-7.163-16-16V128h288v320C368 456.8 360.8 464 352 464zM224 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S208 183.2 208 192v208C208 408.8 215.2 416 224 416zM144 416C152.8 416 160 408.8 160 400V192c0-8.844-7.156-16-16-16S128 183.2 128 192v208C128 408.8 135.2 416 144 416zM304 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S288 183.2 288 192v208C288 408.8 295.2 416 304 416z" />
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
        {tab === 'comments' && (
          <>
            {commentsPending ? (
              <p className="font-semibold">로딩 중..</p>
            ) : commentsError ? (
              <p className="font-semibold">댓글 불러오기 오류 발생..</p>
            ) : (
              <div className="overflow-y-auto h-[280px]">
                <ul>
                  {comments.length > 0 ? (
                    comments.map((comment) => (
                      <li
                        key={comment.id}
                        className="w-[700px] p-5 flex flex-col items-start rounded-xl my-5 text-black bg-white"
                      >
                        <div className="flex flex-row justify-start">
                          <img src={newProfileImg || defaultImg} className="w-12 h-12 rounded-full" alt="프로필 사진" />
                          <div className="pl-3 flex flex-col justify-start">
                            <h1 className="font-semibold text-start">{comment.restaurant?.name}</h1>
                            <p>{comment.comment}</p>
                          </div>
                        </div>
                        <div className="w-full flex justify-between pl-[60px] mt-2">
                          <p>{formatCustomDateTime(comment.created_at)}</p>
                          <button type="button" onClick={() => handleCommentDelete.mutate(comment.id)}>
                            <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" className="w-5">
                              <path d="M432 80h-82.38l-34-56.75C306.1 8.827 291.4 0 274.6 0H173.4C156.6 0 141 8.827 132.4 23.25L98.38 80H16C7.125 80 0 87.13 0 96v16C0 120.9 7.125 128 16 128H32v320c0 35.35 28.65 64 64 64h256c35.35 0 64-28.65 64-64V128h16C440.9 128 448 120.9 448 112V96C448 87.13 440.9 80 432 80zM171.9 50.88C172.9 49.13 174.9 48 177 48h94c2.125 0 4.125 1.125 5.125 2.875L293.6 80H154.4L171.9 50.88zM352 464H96c-8.837 0-16-7.163-16-16V128h288v320C368 456.8 360.8 464 352 464zM224 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S208 183.2 208 192v208C208 408.8 215.2 416 224 416zM144 416C152.8 416 160 408.8 160 400V192c0-8.844-7.156-16-16-16S128 183.2 128 192v208C128 408.8 135.2 416 144 416zM304 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S288 183.2 288 192v208C288 408.8 295.2 416 304 416z" />
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
        {tab === 'profile' && (
          <form onSubmit={handleSubmit} className="space-y-4 rounded-xl flex flex-col items-center">
            <div className="w-[500px] flex flex-col items-start">
              <label className="text-sm font-medium">닉네임 변경</label>
              <input
                type="text"
                value={newNickname}
                placeholder="변경하실 닉네임을 입력해주세요."
                className="mt-1 block w-full bg-white border border-gray-700 rounded-lg p-2 text-black"
                onChange={(e) => setNewNickname(e.target.value)}
              />
            </div>
            <div className="w-[500px] flex flex-col items-start">
              <label className="text-sm font-medium">프로필 이미지 변경</label>
              <input
                type="file"
                className="mt-1 block w-[250px] text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-700 file:text-gray-300 hover:file:bg-gray-600"
                onChange={(e) => handleImageChange(e.target.files)}
              ></input>
            </div>
            <button
              type="submit"
              className="w-[200px] bg-[#EC4C4C] text-white py-2 rounded-lg hover:bg-red-500 font-semibold"
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
