import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import supabase from '../../../supabase/supabase';
import Swal from 'sweetalert2';
import { useState } from 'react';

const CommentBox = ({ userId, comment }) => {
  // 현재 로그인한 유저
  // const userId = useAuthStore((state) = state.user.id)

  const [modify, setModify] = useState(false);

  const [newComment, setNewComment] = useState(comment.comment);

  const queryClient = useQueryClient();

  // 댓글을 작성한 유저
  const getUserData = async (Id) => {
    let { data } = await supabase.from('users').select('*').eq('id', Id).single();

    return data;
  };

  const {
    data: userData,
    isPending,
    isError
  } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserData(userId)
  });

  console.log('userData', userData);

  const commentDelete = async (commnetUserId) => {
    const { data, error } = await supabase.from('comments').delete().eq('user_id', commnetUserId).eq('id', comment.id);
    console.log(data);
  };

  const { mutate: handleCommentDelete } = useMutation({
    mutationFn: (commnetUserId) => commentDelete(commnetUserId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['comments', comment.restaurant_id] });

      const previousComments = queryClient.getQueryData(['comments', comment.restaurant_id]);

      return { previousComments };
    },
    onError: (err, context) => {
      queryClient.setQueriesData(['comments', comment.restaurant_id], context.previousComments);
      Swal.fire({
        icon: 'error',
        title: '댓글 삭제에 실패하셨습니다.',
        text: '잠시 후 댓글을 삭제하세요.'
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', comment.restaurant_id] });
      Swal.fire({
        icon: 'success',
        title: '댓글을 삭제했습니다.',
        text: '댓글 삭제에 성공했습니다.'
      });
    }
  });

  const commentModify = async () => {
    const { data, error } = await supabase
      .from('comments')
      .update({ comment: newComment })
      .eq('id', comment.id)
      .eq('user_id', userId)
      .select();

    return data;
  };

  const { mutate: handleCommentModify } = useMutation({
    mutationFn: commentModify,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['comments', comment.restaurant_id] });

      const previousComments = queryClient.getQueryData(['comments', comment.restaurant_id]);

      return { previousComments };
    },
    onError: (err, context) => {
      queryClient.setQueriesData(['comments', comment.restaurant_id], context.previousComments);
      Swal.fire({
        icon: 'error',
        title: '댓글 수정에 실패했습니다.',
        text: '잠시 후 댓글을 수정하세요.'
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', comment.restaurant_id] });
      Swal.fire({
        icon: 'success',
        title: '댓글을 수정했습니다.',
        text: '댓글 수정에 성공했습니다.'
      });
    }
  });

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
          {/* // <p className="text-sm">{comment.comment}</p> */}
        </div>
        {userData.id === userId && (
          <div className="mt-[8px] flex gap-2 items-center justify-end">
            <button
              onClick={handleCommentUpdate}
              className="w-[50px] h-[30px] border-none outline-none rounded-[5px] text-white text-sm bg-blue-600"
            >
              수정
            </button>
            <button
              onClick={() => handleCommentDelete(userId)}
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
