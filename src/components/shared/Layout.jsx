import { Outlet } from 'react-router-dom';

import Header from '../layout/header';
import Footer from '../layout/footer';

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
