import useAuthStore from '../../../store/authStore';

import useCommentBox from '../../../hooks/useCommentBox';

const CommentBox = ({ comment }) => {
  // 현재 로그인한 유저
  const user = useAuthStore((state) => state.user);

  const {
    modify,
    setModify,
    newComment,
    setNewComment,
    userData,
    isPending,
    isError,
    handleCommentDelete,
    handleCommentModify
  } = useCommentBox(comment, user);

  const handleCommentUpdate = () => {
    if (modify) {
      handleCommentModify();
      setModify(false);
    } else {
      setModify(true);
    }
  };

  if (isPending) {
    return <div>로딩 중..</div>;
  }

  if (isError) {
    return <div>에러발 생...</div>;
  }

  return (
    <div className="w-full min-h-[120px] p-2 rounded-[16px] border-none shadow-md flex flex-row items-center gap-[9.98px] bg-slate-400">
      <img src={userData.profile_image_url} alt="User Profile" className="w-[60px] h-[60px] rounded-full" />
      <div className="w-full">
        <div className="flex items-center justify-between">
          <h5 className="text-base font-[600]">{userData.nickname}</h5>
          <p className="text-[12px] text-slate-300">
            {new Date(comment.created_at).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
        <div className="mt-[6.67px] flex items-center justify-between">
          {modify ? (
            <>
              <input
                className="w-full p-2 border-none outline-none rounded-lg"
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </>
          ) : (
            <>
              <p className="text-sm">{comment.comment}</p>
            </>
          )}
        </div>
        {userData.id === user.id && (
          <div className="mt-[8px] flex gap-2 items-center justify-end">
            <button
              onClick={handleCommentUpdate}
              className="w-[50px] h-[30px] border-none outline-none rounded-[5px] text-white text-sm bg-blue-600"
            >
              수정
            </button>
            <button
              onClick={() => handleCommentDelete(comment.user_id)}
              className="w-[50px] h-[30px] border-none outline-none rounded-[5px] text-white text-sm bg-red-600"
            >
              삭제
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentBox;
