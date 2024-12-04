import { useMutation, useQueryClient } from '@tanstack/react-query';

import Swal from 'sweetalert2';

import supabase from '../../supabase/supabase';

import useAuthStore from '../../store/authStore';

export const useDeleteComment = () => {
  const user = useAuthStore((state) => state.user); //zustand의 로그인 user 정보
  const queryClient = useQueryClient();
  // supabase comments 테이블 삭제 API 함수
  const deleteComment = async (CommentId) => {
    const { error } = await supabase.from('comments').delete().eq('id', CommentId);
    if (error) console.error('리뷰 삭제 에러:', error);
  };

  // tanstack query로 supabase comments 테이블 상태 관리
  const handleCommentDelete = useMutation({
    // 댓글 삭제 API 함수 호출
    mutationFn: (commentId) => deleteComment(commentId),
    onSuccess: () => {
      // 삭제 성공 시, 캐시 무효화
      queryClient.invalidateQueries(['comments', user.id]);
    }
  });

  // 리뷰 삭제 sweetalert
  const confirmDeleteComment = (commentId) => {
    Swal.fire({
      icon: 'warning',
      title: '정말 삭제하시겠습니까?',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '삭제',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.isConfirmed) {
        handleCommentDelete.mutate(commentId);
        Swal.fire({
          icon: 'success',
          title: '삭제 완료!',
          confirmButtonColor: '#429f50'
        });
      }
    });
  };
  return { user, confirmDeleteComment };
};
