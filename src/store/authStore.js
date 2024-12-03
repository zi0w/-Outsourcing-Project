import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import supabase from '../supabase/supabase';

const authStore = persist(
  (set) => ({
    isLogin: false,
    user: null,

    //로그인
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

      //상태 업데이트
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

    //로그아웃
    logout: () => {
      // 상태 초기화
      set(() => ({
        isLogin: false,
        user: null
      }));

      localStorage.clear();
    }
  }),
  { name: 'auth' }
);

const useAuthStore = create(authStore);
export default useAuthStore;
