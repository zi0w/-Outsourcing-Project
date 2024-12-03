import { useQuery } from '@tanstack/react-query';

import supabase from '../../../supabase/supabase';

import CommentBox from './CommentBox';

const Comments = ({ id }) => {
  // const id = '0c67a5e8-eef2-4995-a5bf-a14d6910ad0a';

  const getCommentDatas = async (restaurantId) => {
    let { data } = await supabase.from('comments').select('*').eq('restaurant_id', restaurantId);

    return data;
  };

  const {
    data: restaurantComments,
    isPending,
    isError
  } = useQuery({
    queryKey: ['comments', id],
    queryFn: () => getCommentDatas(id)
  });

  console.log(restaurantComments);

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
          restaurantComments.map((comment) => (
            <CommentBox
              key={comment.id}
              userId={comment.user_id}
              comment={comment.comment}
              createdAt={comment.created_at}
            />
          ))
        ) : (
          <p className="text-center text-slate-400">댓글이 없습니다. 댓글을 입력해주세요.</p>
        )}
      </div>
    </div>
  );
};

export default Comments;
