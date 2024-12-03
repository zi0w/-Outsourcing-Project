import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import useAuthStore from '../../store/authStore';

import AuthForm from '../../components/features/AuthForm';

const SigninPage = () => {
  const navigate = useNavigate();

  const handleSignin = async (formState) => {
    const { email, password } = formState;
    try {
      //zustand 로그인 함수
      await useAuthStore.getState().login(email, password);

      Swal.fire({
        icon: 'success',
        title: '로그인 성공!'
      });

      navigate('/');
    } catch (error) {
      if (error.message.includes('Invalid login credentials')) {
        Swal.fire({
          icon: 'error',
          title: '로그인 오류',
          text: '이메일 또는 비밀번호가 잘못되었습니다.'
        });
      } else {
        // 그외 에러
        Swal.fire({
          icon: 'error',
          title: '로그인 오류',
          text: error.message
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#0E0E0E] to-[#333333]">
      <div className="p-[60px] bg-white w-[500px] rounded-3xl text-center">
        <h2 className="mb-5 text-4xl font-bold">로그인</h2>
        <AuthForm mode="signin" onSubmit={handleSignin} />
        <div className="flex items-center justify-center gap-2 mt-6  text-sm">
          <p className="text-[#aaa]">계정이 없으신가요?</p>
          <Link to="/signup" className="font-bold text-[#EC4C4C] hover:underline">
            회원가입하러 가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
