
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';
import { useState } from 'react';
import { motion } from 'framer-motion';


const Navbar = () => {

  const { toggleSidebar, logoutUser, user } = useAppContext();
  return (
    <nav className='h-24 flex items-center justify-center sticky top-0 z-20 transition-all duration-300'>
      <div className='w-[90%] md:w-[95%] bg-white/70 backdrop-blur-xl rounded-2xl shadow-sm border border-white/50 px-6 py-3 flex items-center justify-between mt-4'>
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type='button'
            className='text-blue-600 text-2xl cursor-pointer bg-blue-50 p-2 rounded-lg hover:bg-blue-100 transition-colors'
            onClick={toggleSidebar}
          >
            <FaAlignLeft />
          </motion.button>
        </div>
          
        <div className="text-right">
            <span className="text-xl font-extrabold text-slate-800 tracking-tight">Job Tracker</span>
            <span className="hidden md:inline-block mx-2 text-slate-300">|</span>
            <span className="hidden md:inline-block text-xs font-bold text-slate-500 uppercase tracking-wider">Powered by Gaplify</span>
        </div>

       
      </div>
    </nav>
  );
};

export default Navbar;
