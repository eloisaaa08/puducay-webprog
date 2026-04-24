import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-100 text-zinc-900">
      
      <NavBar />

      {/* ✅ Main content area grows to fill available space */}
      <main className="flex-grow pt-20">
        <Outlet />
      </main>

      {/* ✅ Footer stays at the bottom */}
      <Footer />
      
    </div>
  );
};

export default Layout;