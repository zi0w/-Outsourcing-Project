import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from '../../pages/home/HomePage';
import SigninPage from '../../pages/signin/SigninPage';
import SignupPage from '../../pages/signup/SignupPage';
import ProfilePage from '../../pages/profile/ProfilePage';
import DetailPage from '../../pages/detail/DetailPage';
import Layout from './Layout';
import SearchPage from '../../pages/search/SearchPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/detail" element={<DetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
