import { useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import Swal from 'sweetalert2';

import supabase from '../supabase/supabase';

const useCommentBox = (comment, user) => {
  const [modify, setModify] = useState(false);

  const [newComment, setNewComment] = useState(comment.comment);

  const queryClient = useQueryClient();

  const getUserData = async (Id) => {
    let { data } = await supabase.from('users').select('*').eq('id', Id).single();

    return data;
  };

  const commentModify = async () => {
    const { data, error } = await supabase
      .from('comments')
      .update({ comment: newComment })
      .eq('id', comment.id)
      .eq('user_id', user.id)
      .select();

    if (error) {
      Swal.fire({
        icon: 'error',
        title: '데이터를 가져오는데 실패했습니다.',
        text: '잠시 후 다시 시도해 주세요.'
      });

      return;
    }

    return data;
  };

  const commentDelete = async (commnetUserId) => {
    const { error } = await supabase.from('comments').delete().eq('user_id', commnetUserId).eq('id', comment.id);

    if (error) {
      Swal.fire({
        icon: 'error',
        title: '데이터를 가져오는데 실패했습니다..',
        text: '잠시 후 다시 시도해 주세요.'
      });

      return;
    }
  };

  const {
    data: userData,
    isPending,
    isError
  } = useQuery({
    queryKey: ['user', comment.user_id],
    queryFn: () => getUserData(comment.user_id)
  });

  const { mutate: handleCommentDelete } = useMutation({
    mutationFn: (commnetUserId) => commentDelete(commnetUserId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['comments', comment.restaurant_id] });

      const previousComments = queryClient.getQueryData(['comments', comment.restaurant_id]);

      queryClient.setQueryData(['comments', comment.restaurant_id], (old) =>
        old.filter((item) => item.id !== comment.id)
      );

      return { previousComments };
    },
    onError: (err, _, context) => {
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

  const { mutate: handleCommentModify } = useMutation({
    mutationFn: commentModify,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['comments', comment.restaurant_id] });

      const previousComments = queryClient.getQueryData(['comments', comment.restaurant_id]);

      queryClient.setQueryData(['comments', comment.restaurant_id], (old) =>
        old.filter((item) => (item.id === comment.id ? { ...item, comment: newComment } : item))
      );

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

  return {
    modify,
    setModify,
    newComment,
    setNewComment,
    userData,
    isPending,
    isError,
    handleCommentDelete,
    handleCommentModify
  };
};

export default useCommentBox;
