import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import supabase from '../../supabase/supabase';
import AuthForm from '../../components/features/AuthForm';

const SignupPage = () => {
  const navigate = useNavigate();

  const handleSignup = async (formState) => {
    const { email, password, nickname } = formState;

    const defaultProfileImgUrl = 'https://i.pinimg.com/736x/3b/73/a1/3b73a13983f88f8b84e130bb3fb29e17.jpg'; //TODO이미지 바꾸기

    try {
      const { user, error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nickname,
            profile_image_url: defaultProfileImgUrl
          }
        }
      });

      if (signupError) {
        throw new Error(signupError.message);
      }

      const { data: insertData, error: insertError } = await supabase.from('users').insert([
        {
          email,
          nickname,
          profile_image_url: defaultProfileImgUrl
        }
      ]);

      if (insertError) {
        throw new Error(insertError.message);
      }

      Swal.fire({
        icon: 'success',
        title: '회원가입 되었습니다.'
      });

      navigate('/signin');
    } catch (error) {
      if (error.message.includes('User already registered')) {
        Swal.fire({
          icon: 'error',
          title: '회원가입 오류',
          text: '이미 가입된 이메일입니다.'
        });
      } else {
        // 그외 에러
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: '오류 발생',
          text: error
        });
      }
      return;
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#0E0E0E] to-[#333333]">
      <div className="p-[60px] bg-white w-[500px] rounded-3xl text-center">
        <h2 className="mb-5 text-4xl font-bold">회원가입</h2>
        <AuthForm mode="signup" onSubmit={handleSignup} />
        <div className="flex items-center justify-center gap-2 mt-6  text-sm">
          <p className="text-[#aaa]">이미 계정이 있으신가요?</p>
          <Link to="/signin" className="font-bold text-[#EC4C4C] hover:underline">
            로그인하러 가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
