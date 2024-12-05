import { useCallback } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import Swal from 'sweetalert2';

import useAuthStore from '../../store/authStore';

import supabase from '../../supabase/supabase';

export const useUpdateProfile = (newNickname, setNewNickname, newProfileImg, user) => {
  const queryClient = useQueryClient();

  // supabase users 테이블 업데이트
  const updateUserInfo = useCallback(
    async (currentUserId) => {
      const { error } = await supabase
        .from('users')
        .update({
          profile_image_url: newProfileImg,
          nickname: newNickname
        })
        .eq('id', currentUserId);

      if (error) {
        console.error('유저 정보 업데이트 에러:', error);
      } else {
        // zustand 상태 업데이트 및 캐시 무효화
        useAuthStore.getState().updateProfile(newNickname, newProfileImg);
        queryClient.invalidateQueries(['users', currentUserId]);
      }
    },
    [newNickname, newProfileImg, queryClient]
  );

  // 프로필 정보 변경
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // 닉네임 입력이 비어있는 경우 예외 처리
      if (!newNickname.trim()) {
        Swal.fire({
          icon: 'error',
          title: '닉네임을 입력해주세요.',
          confirmButtonColor: '#d33'
        });
        return;
      }

      // sweetalert
      const result = await Swal.fire({
        icon: 'warning',
        title: '프로필을 변경하시겠습니까?',
        showCancelButton: true,
        confirmButtonColor: '#429f50',
        cancelButtonColor: '#d33',
        confirmButtonText: '변경',
        cancelButtonText: '취소'
      });

      if (result.isConfirmed) {
        // Supabase에 업데이트 요청
        await updateUserInfo(user.id);

        // 성공 메시지 sweetalert
        Swal.fire({
          icon: 'success',
          title: '프로필 변경 성공!',
          confirmButtonColor: '#429f50'
        });
        setNewNickname('');
      }
    },
    [newNickname, updateUserInfo, user.id]
  );

  return { handleSubmit };
};
