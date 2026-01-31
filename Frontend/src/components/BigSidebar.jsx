import { useAppContext } from '../context/appContext';
import { NavLink } from 'react-router-dom';
import links from '../utils/links';

const BigSidebar = () => {
  const { showSidebar } = useAppContext();
  return (
    <aside className={`hidden lg:block shadow-xl min-h-screen bg-white z-10 transition-all duration-300 ease-in-out ${showSidebar ? 'w-64 ml-0' : 'w-0 -ml-64 overflow-hidden'}`}>
      <div className='sticky top-0 h-screen bg-slate-50/50 flex flex-col'> 
        <header className='h-24 flex items-center justify-center border-b border-slate-100 bg-white'>
             <h3 className='text-3xl font-extrabold text-primary-500 flex items-center gap-2'>
                <span className="bg-primary-500 text-white rounded-lg px-2 py-1 text-xl shadow-md">J</span>Tracker
             </h3>
        </header>
        <div className='flex flex-col pt-8 px-4 gap-2'>
            {links.map((link) => {
                const { text, path, id, icon, external } = link;
                if (external) {
                    return (
                        <a
                            href={path}
                            key={id}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='flex items-center text-slate-500 py-3 pl-6 rounded-xl capitalize transition-all duration-300 hover:bg-white hover:text-primary-500 hover:shadow-lg hover:pl-8'
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
                        className={({ isActive }) =>
                            isActive ? 'flex items-center text-white bg-gradient-to-r from-primary-500 to-indigo-600 shadow-md py-3 pl-6 rounded-xl capitalize transition-all duration-300 transform scale-105' : 'flex items-center text-slate-500 py-3 pl-6 rounded-xl capitalize transition-all duration-300 hover:bg-white hover:text-primary-500 hover:shadow-lg hover:pl-8'
                        }
                        end
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

export default BigSidebar;
