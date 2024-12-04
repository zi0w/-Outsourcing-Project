import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import useAuthStore from '../../store/authStore';

import HeaderDropdown from './HeaderDropdown';

const Header = () => {
  const location = useLocation();
  const isLogin = useAuthStore((state) => state.isLogin);
  const profileImg = useAuthStore((state) => state.user?.profile_image_url);

  const [isToggleState, setIsToggleState] = useState(false);

  useEffect(() => {
    setIsToggleState(false);
  }, [location.pathname]);

  return (
    <header className="w-full bg-black">
      <div className="w-full max-w-[1440px] mx-auto bg-black text-white flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <h1 className="block w-[36px] h-[36px] bg-[url('/logo.png')] bg-no-repeat bg-center bg-cover rounded-[50%]"></h1>
          <span className="text-[21px] leading-[64px] ml-[5px] ">이븐한맛집</span>
        </Link>

        <nav className="relative flex items-center gap-5">
          <Link to="/search" className="hover:text-red-500">
            전체보기
          </Link>
          {isLogin ? (
            <div className="flex items-center gap-2 justify-center">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img src={profileImg} alt="profileimg" />
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsToggleState((prev) => !prev);
                }}
              >
                <svg
                  className={`w-6 h-6 fill-white ${isToggleState ? 'rotate-180' : null}`}
                  id="Layer_1"
                  version="1.1"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M98.9,184.7l1.8,2.1l136,156.5c4.6,5.3,11.5,8.6,19.2,8.6c7.7,0,14.6-3.4,19.2-8.6L411,187.1l2.3-2.6  c1.7-2.5,2.7-5.5,2.7-8.7c0-8.7-7.4-15.8-16.6-15.8v0H112.6v0c-9.2,0-16.6,7.1-16.6,15.8C96,179.1,97.1,182.2,98.9,184.7z" />
                </svg>
              </button>
              {isToggleState ? <HeaderDropdown /> : null}
            </div>
          ) : (
            <>
              <Link to="/signin" className="hover:text-red-500">
                로그인
              </Link>
              <Link to="signup" className="hover:text-red-500">
                회원가입
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
export default Header;
