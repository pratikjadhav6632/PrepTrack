import { FaTimes } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';
import { NavLink } from 'react-router-dom';
import links from '../utils/links';
import { motion, AnimatePresence } from 'framer-motion';

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useAppContext();

  const sidebarVariants = {
    hidden: { x: '-100%', opacity: 0 },
    show: { 
        x: 0, 
        opacity: 1,
        transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    exit: { x: '-100%', opacity: 0 }
  };

  return (
    <AnimatePresence>
      {showSidebar && (
        <motion.aside 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-50 flex items-start justify-start bg-slate-900/40 backdrop-blur-md'
        >
          <motion.div 
            variants={sidebarVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className='bg-white/95 backdrop-blur-xl w-[85vw] md:w-[60vw] h-full shadow-2xl relative flex flex-col'
          >
             {/* Gradient Accent */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

            <button 
              className='absolute top-6 right-6 text-3xl text-slate-400 hover:text-rose-500 transition-colors cursor-pointer p-2 hover:bg-rose-50 rounded-full' 
              onClick={toggleSidebar}
            >
              <FaTimes />
            </button>

            <header className="px-8 pt-12 pb-8">
               <div className='flex items-center gap-3'>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30">
                    J
                  </div>
                  <h3 className='text-3xl font-extrabold text-slate-800 tracking-tight'>Tracker</h3>
               </div>
            </header>

            <div className='flex-1 overflow-y-auto w-full py-4 px-6 flex flex-col gap-3'>
                {links.map((link) => {
                    const { text, path, id, icon, external } = link;
                    if (external) {
                         return (
                            <a
                                href={path}
                                key={id}
                                target='_blank'
                                rel='noopener noreferrer'
                                onClick={toggleSidebar}
                                className='flex items-center gap-4 px-6 py-4 text-slate-500 font-bold text-lg capitalize transition-all rounded-2xl hover:bg-slate-50 hover:text-blue-600'
                            >
                                <span className='text-2xl'>{icon}</span>
                                {text}
                            </a>
                        );
                    }
                    return (
                        <NavLink
                            to={path}
                            key={id}
                            onClick={toggleSidebar}
                            className={({ isActive }) =>
                                isActive 
                                ? 'flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 font-bold text-lg capitalize rounded-2xl shadow-indigo-100/50 shadow-sm border border-blue-100 transition-all' 
                                : 'flex items-center gap-4 px-6 py-4 text-slate-500 font-bold text-lg capitalize transition-all rounded-2xl hover:bg-slate-50 hover:text-blue-600'
                            }
                        >
                            <span className='text-2xl transition-colors'>{icon}</span>
                            {text}
                        </NavLink>
                    );
                })}
            </div>
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default SmallSidebar;
