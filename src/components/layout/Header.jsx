import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  // navigate = useNavigate();

  const h1 = styled.h1`
    display: block;
    width: 64px;
    height: 64px;
    background: url()

    font-size: 34px;
    line-height: 64px;

  `

  return (
    <header>
      <div className="w-full max-w-[1440px] h-[100px] mx-auto bg-black text-white flex flex-row justify-between items-center">
        {/* logo */}
        <h1 className="w-[64px] h-[64px]">이븐한 맛집</h1>

        {/* nav */}
        <ul>
          <li>
            {/* go to search page */}
            <Link to="">전체보기</Link>
          </li>
          <li>
            {/* go to signIn page */}
            <Link to="">로그인</Link>
          </li>
          <li>
            {/* go to signUp page  */}
            <Link to="">회원가입</Link>
          </li>
          <li>
            {/* if signIn : user_profile */}
            <img src="" alt="user_profile" />
            <button onClick={''}>DropDownBtn</button>
            <ul>
              <li>
                {/* go to profile page */}
                <Link to="/profile"></Link>
              </li>
              <li>
                {/* do logOut */}
                <button onClick={''}>로그아웃</button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </header>
  );
};
export default Header;

