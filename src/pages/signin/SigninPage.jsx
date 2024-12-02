import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import supabase from '../../supabase/supabase';
import AuthForm from '../../components/features/AuthForm';

const SigninPage = () => {
  const navigate = useNavigate();

  const handleSignin = async (formState) => {
    const { email, password } = formState;
    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw new Error(error.message);
      }

      Swal.fire({
        icon: 'success',
        title: '로그인 성공!'
      });

      navigate('/');
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: 'error',
        title: '로그인 오류',
        text: error
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#0E0E0E] to-[#333333]">
      <div className="p-[60px] bg-white w-[500px] rounded-3xl text-center">
        <h2 className="mb-5 text-4xl font-bold">로그인</h2>
        <AuthForm mode="signin" onSubmit={handleSignin} />
        <div className="flex items-center justify-center gap-2 mt-6  text-sm">
          <p className="text-[#aaa]">계정이 없으신가요?</p>
          <Link to="/signup" className="font-bold text-[#EC4C4C]">
            회원가입하러 가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
