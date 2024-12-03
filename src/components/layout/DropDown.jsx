import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DropDown = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const {
          data: { user },
          error
        } = await supabase.auth.getUser();

        if (error) throw error;
        setUser(user);
      } catch (error) {
        console.error(error);
      }
    };
    getUserData();
  }, []);

  return (
    <div>
      <button to="/">Home</button>
      <h1>Replay</h1>
      <div>
        <button to="/createpost">새 글 작성</button>
        <div>
          <button onClick={toggleDropdown}>
            <img src={user?.user_metadata?.profile_img_url} alt="user-profile" />
            <span>▼</span>
          </button>
          {isDropdownOpen && (
            <ul>
              <li>
                <Link to="/mypost">내 리플레이</Link>
              </li>
              <li>
                <Link to="/mypage">마이페이지</Link>
              </li>
              <li></li>
              <button type="button" onClick={logOut}>
                로그아웃
              </button>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropDown;
