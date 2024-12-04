import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
const HeaderDropdown = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <div className="absolute flex flex-col mt-2 right-0 top-full rounded-md bg-white">
      <Link to="/profile" className="px-3 py-2 text-black hover:text-[#EC4C4C] font-bold">
        마이페이지
      </Link>
      <button type="button" onClick={handleLogout} className="px-3 py-2 text-black hover:text-[#EC4C4C] font-bold">
        로그아웃
      </button>
    </div>
  );
};
export default HeaderDropdown;
