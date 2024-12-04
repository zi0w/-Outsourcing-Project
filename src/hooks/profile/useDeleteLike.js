import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import supabase from '../../supabase/supabase';
import useAuthStore from '../../store/authStore';

export const useDeleteLike = () => {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  // supabase likes 테이블 삭제 API 함수
  const deleteLike = async (likeId) => {
    const { error } = await supabase.from('likes').delete().eq('id', likeId);
    if (error) console.error('좋아요 삭제 에러:', error);
  };

  // tanstack query로 supabase likse 테이블 상태 관리
  const handleLikeDelete = useMutation({
    mutationFn: (likeId) => deleteLike(likeId),
    onSuccess: () => {
      //성공 시, 캐시 무효화
      queryClient.invalidateQueries([`likes`, user.id]);
    }
  });

  // 좋아요 매장 삭제 sweetalert
  const confirmDeleteLike = (likeId) => {
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
        handleLikeDelete.mutate(likeId);
        Swal.fire({
          icon: 'success',
          title: '즐겨찾기 삭제 완료!',
          confirmButtonColor: '#429f50'
        });
      }
    });
  };
  return { confirmDeleteLike, user };
};
