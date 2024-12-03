import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import supabase from '../supabase/supabase';

const authStore = persist(
  (set) => ({
    isLogin: false,
    user: null,
    login: async () => {
      //로그인한 사용자 정보 가져오기
      const {
        data: { user }
      } = await supabase.auth.getUser();

      //users테이블에서 닉네임,프로필사진 가져오기
      const { data, error } = await supabase
        .from('users')
        .select('id, nickname, profile_image_url')
        .eq('email', user.email)
        .single();

      set(() => ({
        isLogin: true,
        user: {
          id: data?.id,
          email: user?.email,
          nickname: data?.nickname,
          profile_image_url: data?.profile_image_url
        }
      }));
    },
    logout: () => {
      // 상태 초기화
      set(() => ({
        isLogin: false,
        user: null
      }));

      // 로컬 스토리지에서 제거
      localStorage.clear();
    }
  }),
  { name: 'auth' }
);

const useAuthStore = create(authStore);
export default useAuthStore;
