import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import supabase from '../supabase/supabase';

const authStore = persist(
  (set) => ({
    isLogin: false,
    user: null,
    accessToken: null,

    //로그인
    login: async (email, password) => {
      try {
        //supabase 로그인 요청
        const { user, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          throw new Error(error);
        }

        //users테이블에서 닉네임,프로필사진 가져오기
        const { data, error: userError } = await supabase
          .from('users')
          .select('id, nickname, profile_image_url')
          .eq('email', email)
          .single();

        if (userError) {
          throw new Error(userError.message);
        }

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
      } catch (error) {
        throw new Error(error.message);
      }
    },

    // 토큰 저장, 소셜 로그인 (구글)
    updateUser: async (id) => {
      const { data, error: userError } = await supabase.from('users').select('*').eq('id', id).single();


      //상태 업데이트
      set(() => ({
        isLogin: true,
        user: {
          id: data?.id,
          email: data?.email,
          nickname: data?.nickname,
          profile_image_url: data?.profile_image_url
        }
      }));
    },


    updateProfile: (nickname, profileImg) => {
      set((state) => ({
        user: {
          ...state.user,
          nickname: nickname || state.user.nickname,
          profile_image_url: profileImg || state.user.profile_image_url
        }
      }));
    },

    updateProfile: (nickname, profileImg) => {
      set((state) => ({
        user: {
          ...state.user,
          nickname: nickname || state.user.nickname,
          profile_image_url: profileImg || state.user.profile_image_url
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
