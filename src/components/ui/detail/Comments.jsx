import CommentBox from './CommentBox';

import useComments from '../../../hooks/useComments';

const Comments = ({ id }) => {
  const { restaurantComments, isPending, isError } = useComments(id);

  if (isPending) {
    return <div>로딩 중..</div>;
  }

  if (isError) {
    return <div>에러발생...</div>;
  }

  return (
    <div className="mt-[30px] border-t-2 border-[#AAAAAA] ">
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
