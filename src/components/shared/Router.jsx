import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';

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

  const PublicRoute = () => (isLogin ? <Navigate to="/" replace /> : <Outlet />);

  const PrivateRoute = () => (isLogin ? <Outlet /> : <Navigate to="/signin" replace />);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route element={<PublicRoute />}>
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route path="/search" element={<SearchPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
