import { useState } from 'react';

import CommentsList from './CommentsList';
import LikesList from './LikesList';
import MyProfile from './MyProfile';
import UpdateProfile from './UpdateProfile';

import Loading from '../common/Loading';

import { useFetchLikes } from '../../../hooks/profile/useFetchLikes';
import { useFetchComments } from '../../../hooks/profile/useFetchComments';
import { useUpdateProfile } from '../../../hooks/profile/useUpdateProfile';

import useAuthStore from '../../../store/authStore';

const Profile = () => {
  const user = useAuthStore((state) => state.user); //zustand의 로그인 user 정보

  const [tab, setTab] = useState('likes'); // 탭을 likes로 기본값 설정
  const [newProfileImg, setNewProfileImg] = useState(''); // 새로 업로드한 이미지 상태
  const [newNickname, setNewNickname] = useState(''); // 새로 입력한 닉네임 상태

  const { likes, likesError, likesPending } = useFetchLikes(user.id); // 좋아요 상태 불러오기

  const { comments, commentsPending, commentsError } = useFetchComments(user.id); // 리뷰 상태 불러오기

  const { handleSubmit } = useUpdateProfile(newNickname, newProfileImg, user);

  return (
    // 유저 프로필 정보
    <section className="h-[calc(100vh-163px)] text-white flex-col items-center pt-36">
      <MyProfile newProfileImg={newProfileImg} setNewProfileImg={setNewProfileImg} />
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
              <Loading />
            ) : likesError ? (
              <p className="font-semibold">북마크 데이터를 가져오는 중 에러가 발생하였습니다.</p>
            ) : (
              <LikesList likes={likes || []} newProfileImg={newProfileImg} />
            )}
          </>
        )}

        {/* 리뷰 리스트 */}
        {tab === 'comments' && (
          <>
            {commentsPending ? (
              <Loading />
            ) : commentsError ? (
              <p className="font-semibold">댓글 불러오기 오류 발생..</p>
            ) : (
              <CommentsList comments={comments} newProfileImg={newProfileImg} />
            )}
          </>
        )}

        {/* 프로필 변경 탭 */}
        {tab === 'profile' && (
          <UpdateProfile newNickname={newNickname} setNewNickname={setNewNickname} handleSubmit={handleSubmit} />
        )}
      </div>
    </section>
  );
};

export default Profile;
