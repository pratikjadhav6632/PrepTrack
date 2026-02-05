import { useAppContext } from '../../context/appContext';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaEraser, FaBriefcase, FaBuilding, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';

const AddJob = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    editJob,
    source,
    sourceOptions,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editJob();
      return;
    }
    createJob();
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  const springTransition = {
    type: "spring",
    stiffness: 400,
    damping: 30
  };

  return (
    <div className="min-h-[80vh] w-full relative flex items-center justify-center font-sans py-12 px-4 sm:px-6 lg:px-8">
       {/* Ambient Background Gradient */}
       <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-200/40 rounded-full blur-3xl" />
          <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-3xl" />
       </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springTransition}
        className='w-full max-w-5xl bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-12 relative overflow-hidden'
      >
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent pointer-events-none" />

        <form className='w-full relative z-10'>
          <div className="mb-10 text-center md:text-left">
             <h3 className='text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight'>
               {isEditing ? 'Edit Job' : 'Add New Job'}
             </h3>
             <p className="text-slate-500 mt-2 font-medium">
               {isEditing ? 'Update the details of your job application' : 'Track a new opportunity in your journey'}
             </p>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start'>
            {/* Position */}
            <div className="group">
               <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Position</label>
               <div className="relative overflow-hidden rounded-xl bg-white border border-slate-200 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300 flex items-center">
                 <div className="pl-4 text-slate-400"><FaBriefcase /></div>
                 <input
                   type='text'
                   name='position'
                   value={position}
                   onChange={handleJobInput}
                   placeholder='e.g. Frontend Developer'
                   className="w-full h-12 px-4 bg-transparent outline-none text-slate-700 placeholder:text-slate-400 font-medium"
                 />
               </div>
            </div>

            {/* Company */}
            <div className="group">
               <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Company</label>
               <div className="relative overflow-hidden rounded-xl bg-white border border-slate-200 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300 flex items-center">
                  <div className="pl-4 text-slate-400"><FaBuilding /></div>
                  <input
                    type='text'
                    name='company'
                    value={company}
                    onChange={handleJobInput}
                    placeholder='e.g. Google'
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
                    name='jobLocation'
                    value={jobLocation}
                    onChange={handleJobInput}
                    placeholder='e.g. New York, NY'
                    className="w-full h-12 px-4 bg-transparent outline-none text-slate-700 placeholder:text-slate-400 font-medium"
                  />
               </div>
            </div>
            
            {/* Status */}
            {isEditing && (
              <div className="group">
                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Status</label>
                 <div className="relative overflow-hidden rounded-xl bg-white border border-slate-200 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300">
                    <select
                      name='status'
                      value={status}
                      onChange={handleJobInput}
                      className="w-full h-12 px-4 bg-transparent outline-none text-slate-700 font-medium appearance-none cursor-pointer"
                    >
                      {statusOptions.map((itemValue, index) => (
                        <option key={index} value={itemValue}>{itemValue}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                 </div>
              </div>
            )}
            
            {/* Platform */}
            <div className="group">
               <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Platform</label>
               <div className="relative overflow-hidden rounded-xl bg-white border border-slate-200 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300 flex items-center">
                 <div className="pl-4 text-slate-400"><FaGlobe /></div>
                 <input
                   type='text'
                   name='source'
                   value={source}
                   onChange={handleJobInput}
                   list='platformOptions'
                   placeholder='e.g. LinkedIn'
                   className="w-full h-12 px-4 bg-transparent outline-none text-slate-700 placeholder:text-slate-400 font-medium"
                 />
                 <datalist id='platformOptions'>
                   {sourceOptions.map((item, index) => {
                     return <option key={index} value={item} />;
                   })}
                 </datalist>
               </div>
            </div>
            
            {/* Job Type */}
            <div className="group">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Job Type</label>
                <div className="relative overflow-hidden rounded-xl bg-white border border-slate-200 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300">
                  <select
                    name='jobType'
                    value={jobType}
                    onChange={handleJobInput}
                    className="w-full h-12 px-4 bg-transparent outline-none text-slate-700 font-medium appearance-none cursor-pointer"
                  >
                    {jobTypeOptions.map((itemValue, index) => (
                      <option key={index} value={itemValue}>{itemValue}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                      <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
            </div>

            <div className='flex items-end gap-4 mt-2 lg:col-span-3 justify-end border-t border-slate-100 pt-8'>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='h-12 px-8 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 font-semibold shadow-sm transition-colors flex items-center gap-2'
                onClick={(e) => {
                  e.preventDefault();
                  clearValues();
                }}
              >
                <FaEraser /> Clear
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type='submit'
                className='h-12 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2'
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                    <span className="flex items-center gap-2">Processing...</span>
                ) : (
                    <span className="flex items-center gap-2"><FaPaperPlane /> Submit</span>
                )}
              </motion.button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddJob;
