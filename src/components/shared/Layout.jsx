import { Outlet, useLocation } from 'react-router-dom';

import Header from '../layout/Header';
import Footer from '../layout/Footer';

const Layout = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      {location.pathname === '/search' || location.pathname.includes('/detail') ? null : <Footer />}
    </>
  );
};

export default Layout;
