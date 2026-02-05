import { useAppContext } from '../context/appContext';
import { FaSearch, FaFilter, FaSort, FaBriefcase, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SearchContainer = () => {
  const {
    isLoading,
    search,
    searchStatus,
    statusOptions,
    jobTypeOptions,
    searchType,
    sort,
    sortOptions,
    handleChange,
    clearFilters,
  } = useAppContext();

  const handleSearch = (e) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full p-8 md:p-10 mb-12 border border-white/60 relative overflow-hidden font-sans'
    >
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent pointer-events-none" />

      <form className='w-full relative z-10'>
        <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
               <FaFilter className="text-xl" />
            </div>
            <h3 className='text-3xl font-extrabold text-slate-800 tracking-tight'>Search & Filter</h3>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-end'>
          {/* search position */}
          <div className="group">
             <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Search Position</label>
             <div className="relative overflow-hidden rounded-xl bg-white border border-slate-200 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300 flex items-center">
               <div className="pl-4 text-slate-400"><FaSearch /></div>
               <input
                 type='text'
                 name='search'
                 value={search}
                 onChange={handleSearch}
                 placeholder='e.g. Developer'
                 className="w-full h-12 px-4 bg-transparent outline-none text-slate-700 placeholder:text-slate-400 font-medium"
               />
             </div>
          </div>

          {/* search by status */}
          <div className="group">
             <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Job Status</label>
             <div className="relative overflow-hidden rounded-xl bg-white border border-slate-200 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                 <FaBriefcase />
               </div>
               <select
                 name='searchStatus'
                 value={searchStatus}
                 onChange={handleSearch}
                 className="w-full h-12 pl-10 px-4 bg-transparent outline-none text-slate-700 font-medium appearance-none cursor-pointer"
               >
                 {['all', ...statusOptions].map((itemValue, index) => (
                   <option key={index} value={itemValue}>{itemValue}</option>
                 ))}
               </select>
               <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                  <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
               </div>
             </div>
          </div>

          {/* search by type */}
          <div className="group">
             <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Job Type</label>
             <div className="relative overflow-hidden rounded-xl bg-white border border-slate-200 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                 <FaBriefcase />
               </div>
               <select
                 name='searchType'
                 value={searchType}
                 onChange={handleSearch}
                 className="w-full h-12 pl-10 px-4 bg-transparent outline-none text-slate-700 font-medium appearance-none cursor-pointer"
               >
                 {['all', ...jobTypeOptions].map((itemValue, index) => (
                   <option key={index} value={itemValue}>{itemValue}</option>
                 ))}
               </select>
               <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                  <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
               </div>
             </div>
          </div>

          {/* sort */}
          <div className="group">
             <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Sort By</label>
             <div className="relative overflow-hidden rounded-xl bg-white border border-slate-200 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                 <FaSort />
               </div>
               <select
                 name='sort'
                 value={sort}
                 onChange={handleSearch}
                 className="w-full h-12 pl-10 px-4 bg-transparent outline-none text-slate-700 font-medium appearance-none cursor-pointer"
               >
                 {sortOptions.map((itemValue, index) => (
                   <option key={index} value={itemValue}>{itemValue}</option>
                 ))}
               </select>
               <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                  <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
               </div>
             </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: '#fee2e2' }}
            whileTap={{ scale: 0.98 }}
            className='h-12 w-full rounded-xl bg-red-50 text-red-500 hover:text-red-600 font-bold shadow-sm transition-all flex items-center justify-center gap-2 border border-red-100'
            disabled={isLoading}
            onClick={handleSubmit}
          >
            <FaTimes /> Clear Filters
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default SearchContainer;
