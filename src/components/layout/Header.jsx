import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  // navigate = useNavigate();

  return (
    <header className='w-full bg-black'>
      <div className="w-full max-w-[1440px] h-[100px] mx-auto bg-black text-white flex flex-row justify-between items-center pr-[15px]">
        {/* logo */}
        <Link to="/" className="flex">
          <h1 className="block w-16 h-16 bg-[url('/logo.png')] ml-[25px] bg-no-repeat bg-center bg-cover"></h1>
          <span className="text-[26px] leading-[64px] ml-[12px] ">이븐한맛집</span>
        </Link>

        {/* nav */}
        <ul className="flex text-[21px]">
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
          {/* <li> */}
          {/* if signIn : user_profile */}
          {/* <img src="" alt="user_profile" /> */}
          {/* <button onClick={''}>DropDownBtn</button> */}
          {/* <ul> */}
          {/* <li> */}
          {/* go to profile page */}
          {/* <Link to="/profile"></Link> */}
          {/* </li> */}
          {/* <li> */}
          {/* do logOut */}
          {/* <button onClick={''}>로그아웃</button> */}
          {/* </li> */}
          {/* </ul> */}
          {/* </li> */}
        </ul>
      </div>
    </header>
  );
};
export default Header;
