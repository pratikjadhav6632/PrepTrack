import { FaTimes } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';
import { NavLink } from 'react-router-dom';
import links from '../utils/links';

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useAppContext();

  return (
    <aside className={`fixed inset-0 z-50 flex items-start justify-start transition-all duration-300 bg-slate-900/60 backdrop-blur-sm ${showSidebar ? 'visible opacity-100' : 'invisible opacity-0'}`}>
      <div className={`bg-white w-[85vw] md:w-[60vw] h-full shadow-2xl relative flex flex-col transition-all duration-300 transform ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
        <button 
          className='absolute top-4 right-4 text-3xl text-slate-500 hover:text-red-500 transition-colors cursor-pointer p-1 hover:bg-slate-100 rounded-full' 
          onClick={toggleSidebar}
        >
          <FaTimes />
        </button>
        <header className="px-8 pt-10 pb-6 border-b border-slate-100">
           <h3 className='text-3xl font-extrabold text-primary-500 flex items-center gap-2'>
              <span className="bg-primary-500 text-white rounded-lg px-2 py-1 text-2xl shadow-md">J</span>Tracker
           </h3>
        </header>
        <div className='flex-1 overflow-y-auto w-full py-6 px-4 flex flex-col gap-2'>
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
                            className='flex items-center text-slate-500 font-medium text-lg capitalize transition-all py-3 pl-6 hover:bg-slate-50 hover:pl-8 hover:text-primary-500 border-l-4 border-transparent'
                        >
                            <span className='mr-4 text-2xl grid place-items-center'>{icon}</span>
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
                            isActive ? 'flex items-center text-primary-600 bg-blue-50/80 border-l-4 border-primary-500 py-3 pl-6 font-semibold capitalize text-lg transition-all' : 'flex items-center text-slate-500 font-medium text-lg capitalize transition-all py-3 pl-6 hover:bg-slate-50 hover:pl-8 hover:text-primary-500 border-l-4 border-transparent'
                        }
                    >
                        <span className='mr-4 text-2xl grid place-items-center'>{icon}</span>
                        {text}
                    </NavLink>
                );
            })}
        </div>
      </div>
    </aside>
  );
};

export default SmallSidebar;
