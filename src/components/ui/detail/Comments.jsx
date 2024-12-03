import CommentBox from './CommentBox';

import useComments from '../../../hooks/useComments';

import useAuthStore from '../../../store/authStore';

const Comments = ({ id }) => {
  const { restaurantComments, isPending, isError } = useComments(id);

  const isLogin = useAuthStore((state) => state.isLogin);

  if (isPending) {
    return <div>로딩 중..</div>;
  }

  if (isError) {
    return <div>에러발생...</div>;
  }

  return (
    <div
      className={`mt-8 border-t-2 border-[#AAAAAA]  ${
        !isLogin
          ? 'after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[50%] after:backdrop-blur-[3px]'
          : ''
      }`}
    >
      <div
        className="p-2 flex flex-col gap-[27px] mt-[8px] max-h-[250px] overflow-y-auto [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar-track]:bg-gray-100
      [&::-webkit-scrollbar-thumb]:bg-gray-300
      dark:[&::-webkit-scrollbar-track]:bg-neutral-700
      dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
        {restaurantComments?.length > 0 ? (
          restaurantComments.map((comment) => <CommentBox key={comment.id} comment={comment} />)
        ) : (
          <p className="text-center text-slate-400">댓글이 없습니다. 댓글을 입력해주세요.</p>
        )}
      </div>
    </div>
  );
};

export default Comments;
