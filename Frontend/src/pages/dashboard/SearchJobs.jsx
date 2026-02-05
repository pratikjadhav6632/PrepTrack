import { useState } from 'react';
import { FormRow } from '../../components';
import customFetch from '../../utils/axios';
import { toast } from 'react-toastify';
import { FaBriefcase, FaMapMarkerAlt, FaExternalLinkAlt, FaPlus, FaSearch } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const SearchJobs = () => {
    const [values, setValues] = useState({
        query: '',
        location: '',
        experience: 'all',
    });
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            let url = `/search?query=${values.query}&location=${values.location}`;
            if (values.experience !== 'all') {
                url += `&job_requirements=${values.experience}`;
            }
            const { data } = await customFetch.get(url);
            setJobs(data.data);
        } catch (error) {
            toast.error(error?.response?.data?.msg || 'Failed to fetch jobs');
        }
        setIsLoading(false);
    };

    const handleAddJob = async (job) => {
        try {
            await customFetch.post('/jobs', {
                position: job.job_title,
                company: job.employer_name,
                jobLocation: job.job_city ? `${job.job_city}, ${job.job_country}` : 'Remote',
                status: 'Applied',
                jobType: job.job_is_remote ? 'Remote' : 'Full-Time',
            });
            toast.success('Job added to tracker!');
        } catch (error) {
            toast.error(error?.response?.data?.msg || 'Failed to add job');
        }
    };

    // Fast, snappy spring transition
    const springTransition = {
        type: "spring",
        stiffness: 400,
        damping: 30
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05, // Very fast stagger
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0, scale: 0.95 },
        show: { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            transition: springTransition
        }
    };

    return (
        <section className="min-h-[80vh] w-full relative overflow-hidden font-sans pb-20">
            {/* Ambient Background Gradient */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 via-white to-blue-50 -z-10" />
            
            {/* Decorative background blobs */}
            <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-200/40 rounded-full blur-3xl" />
            <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                {/* Search Header & Form */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={springTransition}
                    className="w-full max-w-4xl mx-auto"
                >
                    <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 mb-12 relative overflow-hidden">
                         {/* Shine effect on container */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent pointer-events-none" />
                        
                        <div className="relative z-10">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="p-4 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/20 transform -rotate-3">
                                        <FaSearch className="text-white text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                                            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Next Role</span>
                                        </h3>
                                        <p className="text-slate-500 font-medium mt-1">Global opportunity search</p>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="w-full relative">
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1.5fr_1.5fr_1fr_auto] gap-4 items-end">
                                    <div className="group">
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Job Title</label>
                                        <div className="relative overflow-hidden rounded-xl bg-white border border-slate-200 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300">
                                            <input 
                                                type='text' 
                                                name='query' 
                                                placeholder='e.g. Frontend Developer'
                                                value={values.query} 
                                                onChange={handleChange}
                                                className="w-full h-12 px-4 bg-transparent outline-none text-slate-700 placeholder:text-slate-400 font-medium"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="group">
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Location</label>
                                        <div className="relative overflow-hidden rounded-xl bg-white border border-slate-200 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300">
                                            <input 
                                                type='text' 
                                                name='location' 
                                                placeholder='e.g. Remote, Berlin'
                                                value={values.location} 
                                                onChange={handleChange}
                                                className="w-full h-12 px-4 bg-transparent outline-none text-slate-700 placeholder:text-slate-400 font-medium"
                                            />
                                        </div>
                                    </div>

                                    <div className="group md:col-span-2 xl:col-span-1">
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Experience</label>
                                        <div className="relative overflow-hidden rounded-xl bg-white border border-slate-200 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300">
                                            <select
                                                name='experience'
                                                value={values.experience}
                                                onChange={handleChange}
                                                className="w-full h-12 px-4 bg-transparent outline-none text-slate-700 font-medium appearance-none cursor-pointer"
                                            >
                                                <option value="all">Any Experience</option>
                                                <option value="no_experience">Fresher / No Experience</option>
                                                <option value="under_3_years_experience">Junior (1-3 Years)</option>
                                                <option value="more_than_3_years_experience">Senior (3+ Years)</option>
                                                <option value="no_degree">No Degree Required</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                                                <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                            </div>
                                        </div>
                                    </div>

                                    <motion.button 
                                        whileHover={{ scale: 1.02, translateY: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        type='submit' 
                                        className='h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all duration-300 flex items-center justify-center gap-2 md:col-span-2 xl:col-span-1'
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <span className="flex items-center gap-2">
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            </span>
                                        ) : (
                                            <>Search</>
                                        )}
                                    </motion.button>
                                </div>
                            </form>
                        </div>
                    </div>
                </motion.div>

                {/* Results Section */}
                <div className='w-full'>
                    <AnimatePresence mode="wait">
                        {jobs.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-6 flex items-center justify-between px-2"
                            >
                                <h5 className='text-2xl font-bold text-slate-800 flex items-center gap-3'>
                                    Found <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-base">{jobs.length}</span> Roles
                                </h5>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    
                    <motion.div 
                        key={jobs.length} // Force re-animation when jobs change
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6'
                    >
                            {jobs.map((job) => (
                                <motion.article 
                                    key={job.job_id}
                                    variants={itemVariants}
                                    initial="hidden" // Explicitly double-ensure entry state
                                    animate="show"   // Explicitly double-ensure target state
                                    layout
                                    whileHover={{ 
                                        y: -8, 
                                        shadow: "0 20px 40px -5px rgba(0, 0, 0, 0.1)",
                                        borderColor: "rgba(59, 130, 246, 0.3)"
                                    }}
                                    className='group relative bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-white/60 hover:bg-white transition-all duration-300'
                                >
                                    {/* Glass gradient overlay on hover */}
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                    
                                    <div className="relative z-10 flex flex-col h-full">
                                        <header className='flex items-start gap-5 mb-5'>
                                            <div className='w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300'>
                                                {job.employer_name ? job.employer_name.charAt(0) : 'J'}
                                            </div>
                                            <div className='flex-1 min-w-0 pt-1'>
                                                <h5 className='text-xl font-bold text-slate-800 leading-tight truncate group-hover:text-blue-600 transition-colors' title={job.job_title}>
                                                    {job.job_title}
                                                </h5>
                                                <p className='text-slate-500 font-medium truncate mt-1'>{job.employer_name}</p>
                                            </div>
                                        </header>

                                        <div className='flex items-center gap-4 mb-6 flex-wrap'>
                                             <JobTag icon={<FaMapMarkerAlt />} text={job.job_city || 'Remote'} />
                                             <JobTag icon={<FaBriefcase />} text={job.job_is_remote ? 'Remote' : 'On-site'} />
                                        </div>

                                        <footer className='mt-auto pt-5 border-t border-slate-100 flex items-center gap-3'>
                                             <motion.a 
                                                href={job.job_apply_link} 
                                                target='_blank' 
                                                rel='noopener noreferrer' 
                                                whileHover={{ scale: 1.02, backgroundColor: '#f0fdf4' }} // emerald-50
                                                whileTap={{ scale: 0.98 }}
                                                className='flex-1 py-2.5 px-4 rounded-xl border border-emerald-100 bg-emerald-50/50 text-emerald-600 font-semibold text-sm flex items-center justify-center gap-2 hover:border-emerald-200 transition-colors'
                                            >
                                                Apply <FaExternalLinkAlt className="text-xs opacity-70" />
                                             </motion.a>
                                             
                                             <motion.button 
                                                type='button' 
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className='flex-1 py-2.5 px-4 rounded-xl bg-blue-600 text-white font-semibold text-sm shadow-md shadow-blue-600/20 hover:bg-blue-700 hover:shadow-blue-600/30 transition-all flex items-center justify-center gap-2'
                                                onClick={() => handleAddJob(job)}
                                            >
                                                Track This <FaPlus className="text-xs" />
                                            </motion.button>
                                        </footer>
                                    </div>
                                </motion.article>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// Helper component for tags
const JobTag = ({ icon, text }) => (
  <div className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-600 text-xs font-semibold tracking-wide'>
    <span className='text-blue-500'>{icon}</span>
    <span className='capitalize truncate max-w-[150px]'>{text}</span>
  </div>
);

export default SearchJobs;
