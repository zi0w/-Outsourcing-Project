import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import HomePage from '../../pages/home/HomePage';
import SigninPage from '../../pages/signin/SigninPage';
import SignupPage from '../../pages/signup/SignupPage';
import ProfilePage from '../../pages/profile/ProfilePage';
import DetailPage from '../../pages/detail/DetailPage';
import Layout from './Layout';
import SearchPage from '../../pages/search/SearchPage';
import useAuthStore from '../../store/authStore';

const Router = () => {
  const isLogin = useAuthStore((state) => state.isLogin);

  const PublicRoute = ({ element }) => (isLogin ? <Navigate to="/" replace /> : element);

  const PrivateRoute = ({ children }) => (isLogin ? children : <Navigate to="/signin" replace />);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<PublicRoute element={<SigninPage />} />} />
          <Route path="/signup" element={<PublicRoute element={<SignupPage />} />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
