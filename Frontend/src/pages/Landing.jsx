import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import Register from './Register';
import Modal from '../components/Modal';
import Footer from '../components/Footer';

// import main from '../assets/main.svg'; // Placeholder for image


const Landing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <main>
      <nav className='w-[90vw] max-w-7xl mx-auto h-24 flex items-center justify-between px-4 sm:px-8'>
        <div className="flex items-center gap-4">
          <h2 className='text-3xl font-extrabold text-primary-500 tracking-tight flex items-center gap-2'>
            <span className="bg-primary-500 text-white rounded-lg px-2 py-1 text-2xl">J</span>obTracker
          </h2>
          <div className="hidden md:block h-6 w-px bg-slate-200"></div>
          <span className="hidden md:block text-sm font-medium text-slate-500">Powered by <span className="text-primary-500 font-bold">Gaplify</span></span>
        </div>
      </nav>
      <div className='container page w-[90vw] max-w-7xl mx-auto min-h-[calc(100vh-6rem)] grid grid-cols-1 md:grid-cols-2 gap-12 items-center -mt-24 px-4 sm:px-8 relative z-0'>
        {/* info */}
        <div className='info animate-fade-in-up'>
          
          <h1 className='font-extrabold text-4xl md:text-5xl lg:text-7xl mb-8 tracking-tight'>
            Job <span className='text-primary-500 relative z-10'>Tracking
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary-200 -z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                 <path d="M0 50 Q 50 100 100 50" stroke="currentColor" strokeWidth="20" fill="none" />
              </svg>
            </span> App
          </h1>
          <p className='text-slate-600 text-lg leading-8 mb-8 max-w-lg'>
            Keep track of every job application in one place. Analyze your progress, 
            identify what's working, and land your dream job faster with data-driven insights.
            No more spreadsheets, no more lost opportunities.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className='btn btn-hero shadow-xl hover:scale-105 transform transition-transform duration-300'
            >
              Login / Register
            </button>
            
          </div>
        </div>
        {/* image placeholder */}
        <div className='hidden md:flex bg-gradient-to-tr from-primary-500 to-indigo-600 h-96 rounded-2xl shadow-2xl items-center justify-center text-white font-bold text-2xl transform rotate-2 hover:rotate-0 transition-all duration-500'>
           {/* You might want to put an actual image here eventually */}
           <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
             <div className="text-6xl mb-4">🚀</div>
             <div>Boost Your Career</div>
           </div>
        </div>
      </div>

      <Footer onOpenModal={() => setIsModalOpen(true)} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Register onClose={() => setIsModalOpen(false)} />
      </Modal>
    </main>
  );
};

export default Landing;
