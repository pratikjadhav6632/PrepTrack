import { Link } from 'react-router-dom';
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';

const Footer = ({ onOpenModal }) => {
  const { user } = useAppContext();

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 px-4 sm:px-8 mt-12 w-full">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="col-span-1 md:col-span-1">
           <h3 className='text-2xl font-extrabold text-white flex items-center gap-2 mb-4'>
              <span className="bg-primary-500 text-white rounded-lg px-2 py-1 text-xl">J</span>obTracker
           </h3>
           <p className="text-sm text-slate-400">
             Empowering your career journey with data-driven insights and effortless tracking.
           </p>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to={user ? "/dashboard" : "/"} className="hover:text-primary-400 transition-colors">Home</Link></li>
            {!user && (
              <li>
                <button onClick={onOpenModal} className="hover:text-primary-400 transition-colors">
                  Login / Register
                </button>
              </li>
            )}
            <li><a href="https://www.gaplify.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">Gaplify</a></li>
          </ul>
        </div>
        <div>
           <h4 className="font-bold text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Guides</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Support</a></li>
            </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4">Connect</h4>
          <div className="flex gap-4">
            <a href="#" className="text-2xl hover:text-white transition-colors hover:scale-110 transform"><FaTwitter /></a>
            <a href="#" className="text-2xl hover:text-white transition-colors hover:scale-110 transform"><FaLinkedin /></a>
            <a href="#" className="text-2xl hover:text-white transition-colors hover:scale-110 transform"><FaGithub /></a>
            <a href="#" className="text-2xl hover:text-white transition-colors hover:scale-110 transform"><FaInstagram /></a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} JobTracker. All rights reserved.</p>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <span>Powered by</span>
          <a href="https://www.gaplify.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-300 hover:text-white">Gaplify</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
