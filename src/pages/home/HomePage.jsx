import { useLocation } from 'react-router-dom';
import Home from '../../components/ui/home/Home';
import { useEffect } from 'react';
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
      console.error('Access token not found in URL');
      return;
    }

    const handleGoogleLogin = async () => {
      const { data: user, error } = await supabase.auth.getUser(accessToken);

      if (error) {
        console.error('Error fetching user info:', error);
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

        if (error) {
          console.error('Error saving user to database:', error);
        }
        useAuthStore.getState().updateUser(id);
      };

      await saveUserToDatabase(user);
    };
    handleGoogleLogin();
  }, []);

  return <Home />;
};

export default HomePage;
