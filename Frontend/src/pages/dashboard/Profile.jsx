import { useState } from 'react';
import { useAppContext } from '../../context/appContext';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaSignOutAlt, FaSave } from 'react-icons/fa';

const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading, logoutUser } = useAppContext();

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !lastName || !location) {
      displayAlert();
      return;
    }
    updateUser({ name, email, lastName, location });
  };

  return (
    <section className="min-h-[80vh] w-full relative font-sans flex items-center justify-center p-4">
       {/* Ambient Background Gradient */}
       <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-[10%] right-[10%] w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
          <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-3xl" />
       </div>

    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full max-w-4xl p-8 md:p-12 border border-white/60 relative overflow-hidden'
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent pointer-events-none" />

      <form className='w-full relative z-10' onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
                <h3 className='text-3xl font-extrabold text-slate-800 tracking-tight'>Profile Settings</h3>
                <p className="text-slate-500 font-medium">Manage your account information</p>
            </div>
            <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type='button' 
                className='px-5 py-2 rounded-xl bg-rose-50 text-rose-600 font-bold text-sm border border-rose-100 flex items-center gap-2 transition-colors hover:bg-rose-100'
                onClick={logoutUser}
            >
                <FaSignOutAlt /> Logout
            </motion.button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* Name */}
          <div className="group">
             <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">First Name</label>
             <div className="relative overflow-hidden rounded-xl bg-white border border-slate-200 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300 flex items-center">
               <div className="pl-4 text-slate-400"><FaUser /></div>
               <input
                 type='text'
                 name='name'
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 placeholder='e.g. John'
                 className="w-full h-12 px-4 bg-transparent outline-none text-slate-700 placeholder:text-slate-400 font-medium"
               />
             </div>
          </div>

          {/* Last Name */}
          <div className="group">
             <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Last Name</label>
             <div className="relative overflow-hidden rounded-xl bg-white border border-slate-200 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300 flex items-center">
               <div className="pl-4 text-slate-400"><FaUser /></div>
               <input
                 type='text'
                 name='lastName'
                 value={lastName}
                 onChange={(e) => setLastName(e.target.value)}
                 placeholder='e.g. Doe'
                 className="w-full h-12 px-4 bg-transparent outline-none text-slate-700 placeholder:text-slate-400 font-medium"
               />
             </div>
          </div>

          {/* Email */}
          <div className="group">
             <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Email Address</label>
             <div className="relative overflow-hidden rounded-xl bg-white border border-slate-200 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300 flex items-center">
               <div className="pl-4 text-slate-400"><FaEnvelope /></div>
               <input
                 type='email'
                 name='email'
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 placeholder='e.g. john@example.com'
                 className="w-full h-12 px-4 bg-transparent outline-none text-slate-700 placeholder:text-slate-400 font-medium"
               />
             </div>
          </div>

          {/* Location */}
          <div className="group">
             <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Location</label>
             <div className="relative overflow-hidden rounded-xl bg-white border border-slate-200 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300 flex items-center">
               <div className="pl-4 text-slate-400"><FaMapMarkerAlt /></div>
               <input
                 type='text'
                 name='location'
                 value={location}
                 onChange={(e) => setLocation(e.target.value)}
                 placeholder='e.g. New York, NY'
                 className="w-full h-12 px-4 bg-transparent outline-none text-slate-700 placeholder:text-slate-400 font-medium"
               />
             </div>
          </div>

          <div className="md:col-span-2 pt-6">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all' 
                type='submit' 
                disabled={isLoading}
              >
                {isLoading ? (
                    'Saving...'
                ) : (
                    <><FaSave /> Save Changes</>
                )}
              </motion.button>
          </div>
        </div>
      </form>
    </motion.div>
    </section>
  );
};

export default Profile;
