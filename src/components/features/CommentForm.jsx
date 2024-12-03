import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import Swal from 'sweetalert2';

import supabase from '../../supabase/supabase';
import useAuthStore from '../../store/authStore';

const CommentForm = ({ id }) => {
  const isLogin = useAuthStore((state) => state.isLogin);

  const user = useAuthStore((state) => state.user);

  const queryClient = useQueryClient();

  const [comment, setComment] = useState('');

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (review) => {
    const { data, error } = await supabase
      .from('comments')
      .insert([{ user_id: user.id, restaurant_id: id, comment: review }])
      .select();

    return data;
  };

  const { mutate: handleCommentSubmit } = useMutation({
    mutationFn: (comment) => handleSubmit(comment),
    onMutate: async (newComment) => {
      await queryClient.cancelQueries({ queryKey: ['comments', id] });

      const previousComments = queryClient.getQueryData(['comments', id]);
      queryClient.setQueryData(['comments', id], (old) => [
        ...old,
        {
          id: Date.now().toString(),
          user_id: user.id,
          restaurant_id: id,
          comment: newComment,
          created_at: new Date()
        }
      ]);
      return { previousComments };
    },
    onError: (err, newComment, context) => {
      queryClient.setQueriesData(['comments', id], context.previousComments);
      Swal.fire({
        icon: 'error',
        title: '댓글 작성에 실패하셨습니다.',
        text: '댓글을 다시 작성하세요.'
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', id] });
      Swal.fire({
        icon: 'success',
        title: '댓글을 작성했습니다.',
        text: '댓글작성을 성공했습니다.'
      });
    }
  });

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (!comment) {
      Swal.fire({
        icon: 'info',
        title: '댓글을 입력해 해주세요.',
        text: '로그인 이후에 리뷰를 남길 수 있습니다.'
      });

      return;
    }

    if (isLogin) {
      handleCommentSubmit(comment);
      setComment('');
    } else {
      Swal.fire({
        icon: 'info',
        title: '로그인 해주세요.',
        text: '로그인 이후에 리뷰를 남길 수 있습니다.'
      });
    }
  };

  return (
    <div>
      <h4 className="text-lg font-[600]">리뷰</h4>

      <form onSubmit={handleSubmitForm}>
        <textarea
          placeholder="리뷰를 입력해주세요."
          className="mt-[9.86px] p-3 text-sm max-w-[440px] w-full h-[142.97px] rounded-[16px] border-none outline-none shadow-md resize-none"
          onChange={handleChange}
          value={comment}
        />
        <button
          type="submit"
          className="mt-[18.73px] w-full h-[47.66px] border-none bg-[#EC4C4C] rounded-[16px] text-white font-[600] hover:bg-[#B73838] transition-all"
        >
          리뷰 작성하기
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
