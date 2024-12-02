import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthForm from '../../components/features/AuthForm';

const SignupPage = () => {
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      if (error) {
        console.error('Sign Up Error:', error.message);
        toast.error(`회원가입 실패: ${error.message}`);
        return;
      }
      if (data.success) {
        Swal.fire({
          icon: 'success',
          title: '회원가입 되었습니다.'
        });
        navigate('/signin');
      }
    } catch (error) {
      let errorMessage = '회원가입에 실패했습니다.';

      if (error.response?.status === 409) {
        errorMessage = '이미 사용 중인 이메일입니다.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      Swal.fire({
        icon: 'error',
        title: '오류 발생',
        text: errorMessage
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#0E0E0E] to-[#333333]">
      <div className="p-[60px] bg-white w-[500px] rounded-3xl text-center">
        <h2 className="mb-5 text-4xl font-bold">회원가입</h2>
        <AuthForm mode="signup" onSubmit={handleSignup} />
        <div className="flex items-center justify-center gap-2 mt-6  text-sm">
          <p className="text-[#aaa]">이미 계정이 있으신가요?</p>
          <Link to="/signin" className="font-bold text-[#EC4C4C]">
            로그인하러 가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
