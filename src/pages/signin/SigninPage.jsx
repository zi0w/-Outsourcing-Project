import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../../components/features/AuthForm';

const SigninPage = () => {
  const navigate = useNavigate();

  const handleSignin = async (formData) => {
    try {
      const { data } = await authApi.post('/login', formData);

      if (data.success) {
        
        navigate('/');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '로그인 실패',
        text: `${error.message || error}`
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
