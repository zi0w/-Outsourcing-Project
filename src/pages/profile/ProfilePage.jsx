import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import supabase from '../../supabase/supabase';

const ProfilePage = () => {
  const [tab, setTab] = useState('likes');
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [newProfileImg, setNewProfileImg] = useState('');
  const [newNickname, setNewNickname] = useState('');

  const handleImageChange = async (files) => {
    const file = files[0];

    if (!file) {
      return;
    }
    const { data } = await supabase.storage.from('profile_img').upload(`profile_img${Date.now()}.png`, file);
    const newImg = `https://zvnqewxnkcdqqlskzqlz.supabase.co/storage/v1/object/public/profile_img/${data.path}`;
    setNewProfileImg(newImg);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //update user 함수 호출해서 매개변수로 로그인 유저정보 넘기기
    updateUserInfo('e34dc365-0881-4c34-97f1-deca8267e365');
  };

  const updateUserInfo = async (currentUserId) => {
    const { error } = await supabase
      .from('users')
      .update({
        profile_image_url: newProfileImg || 'https://i.pinimg.com/736x/3b/73/a1/3b73a13983f88f8b84e130bb3fb29e17.jpg',
        nickname: newNickname
      })
      .eq('id', currentUserId);

    if (error) console.error(error);
  };

  const fetchLikes = async (currentUserId) => {
    const { data: likes, error } = await supabase.from('likes').select('*').eq('user_id', currentUserId);
    if (error) console.error(error);
    return likes;
  };

  const fetchComments = async (currentUserId) => {
    const { data: comments, error } = await supabase.from('comments').select('*').eq('user_id', currentUserId);
    if (error) console.error(error);
    return comments;
  };

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

  return (
    <section className="h-[calc(100vh-300px)] bg-white flex-col items-center">
      <div>
        <img
          src="https://i.pinimg.com/736x/3b/73/a1/3b73a13983f88f8b84e130bb3fb29e17.jpg"
          alt="프로필 사진"
          className="w-[138px] h-[138px] mx-auto rounded-full"
        />
        <h1 className="text-black text-center mt-[20px] text-[24px]">닉네임</h1>
      </div>
      {/* nav */}
      <div className="flex text-white mx-auto w-[900px] my-[30px] bg-gray-700 rounded-[38px]">
        <button
          className="w-[400px] py-3 text-center hover:bg-gray-600 rounded-s-[38px]"
          onClick={() => setTab('likes')}
        >
          좋아요 한 매장
        </button>
        <button className="w-[400px] py-3 text-center hover:bg-gray-600" onClick={() => setTab('comments')}>
          리뷰
        </button>
        <button
          className="w-[400px] py-3 text-center hover:bg-gray-600 rounded-e-[38px]"
          onClick={() => setTab('profile')}
        >
          프로필 변경
        </button>
      </div>
      {/* content */}
      {tab === 'likes' && (
        <ul>
          {likes.length > 0 ? (
            likes.map((like) => (
              <li key={like.id} className="flex justify-between items-center">
                <div>
                  <img
                    src="https://i.pinimg.com/736x/3b/73/a1/3b73a13983f88f8b84e130bb3fb29e17.jpg"
                    alt="프로필 사진"
                  />
                  <div>
                    <h1>매장이름</h1>
                    <span>주소입니다.</span>
                  </div>
                </div>
                <div>
                  <span>영업시간</span>
                  <img alt="삭제 버튼" />
                </div>
              </li>
            ))
          ) : (
            <p>좋아요 한 매장이 없습니다.</p>
          )}
        </ul>
      )}
      {tab === 'comments' && (
        <ul>
          {comments.length > 0 ? (
            comments.map((review) => (
              <li key={review.id}>
                <div>
                  <img
                    src="https://i.pinimg.com/736x/3b/73/a1/3b73a13983f88f8b84e130bb3fb29e17.jpg"
                    alt="프로필 사진"
                  />
                  <div>
                    <h1>매장이름</h1>
                    <span>리뷰입니다.</span>
                  </div>
                </div>
                <div>
                  <span>타임스탬프</span>
                  <img />
                </div>
              </li>
            ))
          ) : (
            <h1>리뷰없음</h1>
          )}
        </ul>
      )}
      {tab === 'profile' && (
        <form onSubmit={handleSubmit}>
          <label>닉네임 변경</label>
          <input type="text" value={newNickname} onChange={(e) => setNewNickname(e.target.value)} />
          <label>프로필 이미지 변경</label>
          <input type="file" onChange={(e) => handleImageChange(e.target.files)}></input>
          <button type="submit">변경하기</button>
        </form>
      )}
    </section>
  );
};

export default ProfilePage;
