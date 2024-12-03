import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import Swal from 'sweetalert2';

import supabase from '../supabase/supabase';

const useCommentForm = (id, user) => {
  const [comment, setComment] = useState('');

  const queryClient = useQueryClient();

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (review) => {
    const { data, error } = await supabase
      .from('comments')
      .insert([{ user_id: user.id, restaurant_id: id, comment: review }])
      .select();

    if (error) {
      Swal.fire({
        icon: 'error',
        title: '리뷰를 추가할 수 없습니다.',
        text: '잠시 후 다시 시도해 주세요.'
      });

      return;
    }

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

  return { comment, setComment, handleChange, handleCommentSubmit };
};

export default useCommentForm;
