import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import Home from '../../components/ui/home/Home';

import supabase from '../../supabase/supabase';

import useAuthStore from '../../store/authStore';

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    const accessToken = new URLSearchParams(location.hash.slice(1)).get('access_token'); // URLSearchParams : 쿼리 파라미터를 쉽게 관리
    if (!accessToken) {
      console.error('토큰오류!');
      return;
    }

    const handleGoogleLogin = async () => {
      const { data: user, error } = await supabase.auth.getUser(accessToken);

      if (error) {
        console.error('유저정보 없음!', error);
        return;
      }
      const saveUserToDatabase = async (user) => {
        const { id, email, user_metadata } = user.user;
        const nickname = user_metadata?.name || '소셜 로그인';
        const profile_image_url = user_metadata?.avatar_url;

        const { data, error } = await supabase.from('users').upsert([
          {
            id,
            email,
            nickname,
            profile_image_url
          }
        ]);

        useAuthStore.getState().updateUser(id);
      };

      await saveUserToDatabase(user);
    };
    handleGoogleLogin();
  }, []);

  return <Home />;
};

export default HomePage;
