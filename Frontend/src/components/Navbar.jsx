
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';
import { useState } from 'react';

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { toggleSidebar, logoutUser, user } = useAppContext();

  return (
    <nav className='h-24 flex items-center justify-center sticky top-0 z-20 bg-white/80 backdrop-blur-md shadow-sm transition-all duration-300'>
      <div className='w-[90vw] flex items-center justify-between lg:w-[90%]'>
        <button
          type='button'
          className='bg-transparent border-transparent text-primary-500 text-3xl cursor-pointer flex items-center transform hover:scale-110 transition-transform'
          onClick={toggleSidebar}
        >
          <FaAlignLeft />
        </button>
        <div>
          <h3 className='hidden lg:block m-0 text-2xl font-extrabold text-primary-500 tracking-tight'>JobTracker</h3>
          <h3 className='lg:hidden m-0 text-2xl font-extrabold text-primary-500 tracking-tight'>JobTracker</h3>
        </div>
        <div className='relative'>
          <button
            type='button'
            className='flex items-center gap-2 bg-gradient-to-r from-primary-500 to-indigo-600 hover:from-primary-600 hover:to-indigo-700 text-white shadow-md hover:shadow-lg py-2 px-4 rounded-full text-base cursor-pointer transition-all duration-300 transform active:scale-95'
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle className="text-xl" />
            <FaCaretDown />
          </button>
          <div className={`absolute top-14 right-0 w-full min-w-[max-content] bg-white shadow-xl p-2 rounded-xl text-center border border-slate-100 transition-all duration-300 origin-top ${showLogout ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
            <button
              type='button'
              className='bg-red-50 text-red-500 font-semibold text-base cursor-pointer tracking-wide p-2 w-full hover:bg-red-100 rounded-lg transition-colors'
              onClick={logoutUser}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
