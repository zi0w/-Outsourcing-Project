import { useCallback, useEffect } from 'react';

import useAuthStore from '../../store/authStore';

import supabase from '../../supabase/supabase';

export const useProfileUploadImage = (newProfileImg, setNewProfileImg) => {
  const user = useAuthStore((state) => state.user); //zustand의 로그인 user 정보
  // 프로필 이미지 업로드 함수
  const handleImageChange = useCallback(
    async (files) => {
      const file = files[0];

      // 파일을 선택하지 않은 경우 함수 종료
      if (!file) {
        return;
      }

      // 브라우저에서 업로드된 파일의 임시 URL 생성
      const tempImgUrl = URL.createObjectURL(file);

      // UI에 즉시 반영 (낙관적)
      setNewProfileImg(tempImgUrl);

      // supabase storage에 이미지 업로드
      try {
        const { data } = await supabase.storage.from('profile_img').upload(`profile_img${Date.now()}.png`, file);
        const newImg = `https://zvnqewxnkcdqqlskzqlz.supabase.co/storage/v1/object/public/profile_img/${data.path}`;
        setNewProfileImg(newImg); // 업로드 된 이미지 URL로 상태 업데이트
      } catch (error) {
        console.error('이미지 업로드 에러:', error);
      }
    },
    [setNewProfileImg]
  );
  useEffect(() => {
    let tempUrl;
    // newProfileImg가 file객체인 경우 URL 생성
    if (newProfileImg instanceof File) {
      tempUrl = URL.createObjectURL(newProfileImg);
    }

    // 언마운트 시, 메모리 해제
    return () => {
      if (tempUrl) {
        URL.revokeObjectURL(tempUrl);
      }
    };
  }, [newProfileImg]);
  return { user, handleImageChange };
};
