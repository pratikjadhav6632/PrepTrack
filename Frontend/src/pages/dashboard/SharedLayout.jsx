import { Outlet } from 'react-router-dom';
import { Navbar, BigSidebar, SmallSidebar } from '../../components';

const SharedLayout = () => {
  return (
    <main className='dashboard grid grid-cols-1 lg:grid-cols-[auto_1fr] bg-slate-50 min-h-screen'>
      <SmallSidebar />
      <BigSidebar />
      <div>
        <Navbar />
        <div className='dashboard-page w-[95%] mx-auto py-8 px-4 lg:px-8 max-w-7xl'>
            <Outlet />
        </div>
      </div>
    </main>
  );
};

export default SharedLayout;
