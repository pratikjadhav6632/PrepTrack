import { useAppContext } from '../context/appContext';
import { NavLink } from 'react-router-dom';
import links from '../utils/links';
import { motion } from 'framer-motion';

const BigSidebar = () => {
  const { showSidebar } = useAppContext();
  return (
    <aside className={`hidden lg:block z-10 transition-all duration-300 ease-in-out ${showSidebar ? 'w-72 mr-8' : 'w-0 overflow-hidden'}`}>
      <div className='sticky top-0 h-screen flex flex-col py-6 pl-6'> 
        <div className="bg-white/80 backdrop-blur-xl h-[95vh] rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 flex flex-col relative overflow-hidden">
             {/* Gradient Accent */}
             <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

            <header className='h-24 flex items-center px-8 border-b border-slate-50'>
                 <div className='flex items-center gap-3'>
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30">
                        J
                      </div>
                      <h3 className='text-2xl font-extrabold text-slate-800 tracking-tight'>Tracker</h3>
                  </div>
            </header>

            <div className='flex flex-col flex-1 py-8 px-4 gap-2 overflow-y-auto'>
                {links.map((link) => {
                    const { text, path, id, icon, external } = link;
                    if (external) {
                         return (
                            <a
                                href={path}
                                key={id}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='flex items-center gap-4 px-4 py-3.5 text-slate-500 font-bold text-base capitalize transition-all rounded-xl hover:bg-slate-50 hover:text-blue-600 group'
                            >
                                <span className='text-xl group-hover:scale-110 transition-transform'>{icon}</span>
                                {text}
                            </a>
                        );
                    }
                    return (
                        <NavLink
                            to={path}
                            key={id}
                            className={({ isActive }) =>
                                isActive 
                                ? 'flex items-center gap-4 px-4 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-base capitalize rounded-xl shadow-lg shadow-blue-500/30 transition-all transform scale-[1.02]' 
                                : 'flex items-center gap-4 px-4 py-3.5 text-slate-500 font-bold text-base capitalize transition-all rounded-xl hover:bg-slate-50 hover:text-blue-600 hover:pl-5 group'
                            }
                            end
                        >
                            <span className='text-xl group-hover:scale-110 transition-transform'>{icon}</span>
                            {text}
                        </NavLink>
                    );
                })}
            </div>
        </div>
      </div>
    </aside>
  );
};

export default BigSidebar;
