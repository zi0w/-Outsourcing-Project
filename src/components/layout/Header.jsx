import { Link } from 'react-router-dom';
import DropDown from './DropDown';

const Header = () => {
  const isLoggedIn = false;

  return (
    <>
      <header className="w-full bg-black">
        <div className="w-full max-w-[1440px] h-[100px] mx-auto bg-black text-white flex flex-row justify-between items-center pl-[20px] pr-[10px]">
          {/* logo */}
          <Link to="/" className="flex items-center">
            <h1 className="block w-[36px] h-[36px] bg-[url('/logo.png')] bg-no-repeat bg-center bg-cover rounded-[50%]"></h1>
            <span className="text-[21px] leading-[64px] ml-[5px] ">이븐한맛집</span>
          </Link>

          {/* nav */}
          <ul className="flex text-[16px]">
            <li>
              {/* go to search page */}
              <Link to="/search" className="content-box p-[10px] hover:text-red-500">
                전체보기
              </Link>
            </li>
            <li className="mx-[15px] my-0">
              {/* go to signIn page */}
              <Link to="/signin" className="content-box p-[10px] hover:text-red-500">
                로그인
              </Link>
            </li>
            <li>
              {/* go to signUp page  */}
              <Link to="signup" className="content-box p-[10px] hover:text-red-500">
                회원가입
              </Link>
            </li>
          </ul>
        </div>
      </header>
      {isLoggedIn ? (
        <DropDown/>
      ) : (
        <></>
      )}
    </>
  );
};
export default Header;
