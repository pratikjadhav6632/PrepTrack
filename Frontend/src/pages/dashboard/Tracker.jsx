import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/appContext';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import moment from 'moment';
import PageBtnContainer from '../../components/PageBtnContainer';
import {
  FaBriefcase,
  FaCalendarAlt,
  FaCheck,
  FaChevronDown,
} from 'react-icons/fa';
import SearchContainer from '../../components/SearchContainer';
import { motion, AnimatePresence } from 'framer-motion';

const Tracker = () => {
  const {
    getJobs,
    jobs,
    isLoading,
    page,
    totalJobs,
    search,
    searchStatus,
    searchType,
    sort,
    numOfPages,
    updateJob,
  } = useAppContext();

  const navigate = useNavigate();

  const [view, setView] = useState('tracker'); // 'tracker' or 'stats'

  useEffect(() => {
    getJobs();
  }, [page, search, searchStatus, searchType, sort]);

  // Use jobs directly from context
  const displayJobs = jobs;

  // State to track which job is being edited for interview details
  const [interviewInputId, setInterviewInputId] = useState(null);

  const handleStatusChangeWrapper = (_id, newStatus) => {
    if (newStatus === 'Shortlisted') {
      setInterviewInputId(_id);
    } else {
      updateJobStatus(_id, newStatus);
      setInterviewInputId(null);
    }
  };

  const updateJobStatus = (_id, status, interviewRounds = 0, interviewDetails = '') => {
    updateJob(_id, { 
        company: displayJobs.find(j => j._id === _id).company, 
        position: displayJobs.find(j => j._id === _id).position, 
        jobLocation: displayJobs.find(j => j._id === _id).jobLocation,
        jobType: displayJobs.find(j => j._id === _id).jobType,
        status, 
        interviewRounds, 
        interviewDetails 
    });
    setInterviewInputId(null);
  };


  if (isLoading) {
    return <Loading center />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <section className="min-h-[80vh] w-full relative font-sans text-slate-700">
        {/* Ambient Background Gradient */}
       <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-[10%] left-[-5%] w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
          <div className="absolute bottom-[20%] right-[-5%] w-[400px] h-[400px] bg-indigo-100/50 rounded-full blur-3xl" />
       </div>

      <SearchContainer />

      <motion.div 
         initial={{ opacity: 0, y: 10 }}
         animate={{ opacity: 1, y: 0 }}
         className="mb-8 flex items-center justify-between"
      >
          <h2 className="text-2xl font-bold text-slate-800">
              My Applications <span className="ml-2 text-sm font-medium px-3 py-1 bg-blue-100 text-blue-600 rounded-full">{totalJobs} Jobs</span>
          </h2>

          <div className="flex bg-white/70 backdrop-blur-md p-1 rounded-xl border border-slate-200">
              <button 
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${view === 'tracker' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                onClick={() => setView('tracker')}
              >
                  Jobs
              </button>
              <button 
                 className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${view === 'stats' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                 onClick={() => setView('stats')}
              >
                  Stats
              </button>
          </div>
      </motion.div>

      {view === 'tracker' ? (
        <>
            {jobs.length === 0 ? (
                 <div className="mt-12 text-center text-slate-400">
                    <h2 className="text-xl font-medium">No jobs to display...</h2>
                 </div>
            ) : (
                <>
                    {/* Desktop View - Table */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className='hidden md:block overflow-hidden bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60'
                    >
                        <table className='w-full border-collapse'>
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className='p-6 text-left text-xs font-bold text-slate-400 uppercase tracking-wider'>Date</th>
                                    <th className='p-6 text-left text-xs font-bold text-slate-400 uppercase tracking-wider'>Position</th>
                                    <th className='p-6 text-left text-xs font-bold text-slate-400 uppercase tracking-wider'>Company</th>
                                    <th className='p-6 text-left text-xs font-bold text-slate-400 uppercase tracking-wider'>Status</th>
                                    <th className='p-6 text-left text-xs font-bold text-slate-400 uppercase tracking-wider'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <AnimatePresence>
                                    {displayJobs.map((job) => {
                                        const date = moment(job.createdAt).format('MMM Do, YY');
                                        let statusStyles = 'text-slate-500 bg-slate-100';
                                        if (job.status === 'Shortlisted') statusStyles = 'text-amber-600 bg-amber-50 border border-amber-100';
                                        if (job.status === 'Rejected') statusStyles = 'text-rose-600 bg-rose-50 border border-rose-100';
                                        if (job.status === 'Accepted') statusStyles = 'text-emerald-600 bg-emerald-50 border border-emerald-100';
                                        if (job.status === 'Interview Scheduled') statusStyles = 'text-indigo-600 bg-indigo-50 border border-indigo-100';
                                        if (job.status === 'Offer') statusStyles = 'text-purple-600 bg-purple-50 border border-purple-100';
                                        if (job.status === 'Applied') statusStyles = 'text-blue-600 bg-blue-50 border border-blue-100';

                                        return (
                                            <motion.tr 
                                                key={job._id}
                                                layout
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="group hover:bg-white/80 transition-colors cursor-pointer"
                                                onClick={() => navigate(`/dashboard/job/${job._id}`)}
                                            >
                                                <td className='p-6 text-sm font-medium text-slate-600'>{date}</td>
                                                <td className='p-6'>
                                                    <div className="font-bold text-slate-800">{job.position}</div>
                                                    <div className="text-xs text-slate-400 md:hidden">{job.jobType}</div>
                                                </td>
                                                <td className='p-6 text-sm font-semibold text-slate-600'>{job.company}</td>
                                                <td className='p-6 relative' onClick={(e) => e.stopPropagation()}>
                                                    <div className="relative inline-block w-40">
                                                        <select 
                                                            value={job.status} 
                                                            onChange={(e) => handleStatusChangeWrapper(job._id, e.target.value)}
                                                            className={`appearance-none w-full px-4 py-2 rounded-xl text-xs font-bold cursor-pointer uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500/20 transition-all ${statusStyles}`}
                                                        >
                                                            <option value="Applied">Applied</option>
                                                            <option value="Shortlisted">Shortlisted</option>
                                                            <option value="Interview Scheduled">Interview</option>
                                                            <option value="Rejected">Rejected</option>
                                                            <option value="Offer">Offer</option>
                                                            <option value="Accepted">Accepted</option>
                                                        </select>
                                                        <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 ${statusStyles.split(' ')[0]}`}>
                                                            <FaChevronDown className="h-3 w-3 opacity-70" />
                                                        </div>
                                                    </div>
                                                    
                                                    {interviewInputId === job._id && (
                                                        <div className="absolute left-0 top-full mt-2 bg-white border border-slate-200 p-4 rounded-xl shadow-2xl z-20 w-64">
                                                            <p className='mb-3 text-sm font-bold text-slate-700'>Interview Rounds?</p>
                                                            <button 
                                                                className="w-full py-2 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors"
                                                                onClick={() => updateJobStatus(job._id, 'Shortlisted', 2, 'HR and Technical')} 
                                                            >
                                                                Confirm (Default: 2)
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className='p-6'>
                                                    {job.interviewDetails && (
                                                        <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-100">
                                                           <FaCheck /> Matches
                                                        </span>
                                                    )}
                                                </td>
                                            </motion.tr>
                                        )
                                    })}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </motion.div>

                    {/* Mobile View - Cards */}
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className='md:hidden flex flex-col gap-4'
                    >
                        {displayJobs.map((job) => {
                            const date = moment(job.createdAt).format('MMM Do, YY');
                            let statusStyles = 'text-slate-500 bg-slate-50 border-slate-100';
                             if (job.status === 'Shortlisted') statusStyles = 'text-amber-600 bg-amber-50 border-amber-100';
                             if (job.status === 'Rejected') statusStyles = 'text-rose-600 bg-rose-50 border-rose-100';
                             if (job.status === 'Accepted') statusStyles = 'text-emerald-600 bg-emerald-50 border-emerald-100';
                             if (job.status === 'Interview Scheduled') statusStyles = 'text-indigo-600 bg-indigo-50 border-indigo-100';
                             if (job.status === 'Offer') statusStyles = 'text-purple-600 bg-purple-50 border-purple-100';
                             if (job.status === 'Applied') statusStyles = 'text-blue-600 bg-blue-50 border-blue-100';

                            return (
                                <motion.div 
                                    key={job._id} 
                                    variants={itemVariants}
                                    className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-white/60 p-5 flex flex-col gap-4 active:scale-[0.99] transition-transform"
                                    onClick={() => navigate(`/dashboard/job/${job._id}`)}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h5 className="font-bold text-lg text-slate-800 leading-tight">{job.position}</h5>
                                            <p className="text-slate-500 text-sm font-medium mt-1">{job.company}</p>
                                        </div>
                                        <div className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
                                            {date}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                                        <div className="relative w-full">
                                            <select 
                                                value={job.status} 
                                                onChange={(e) => handleStatusChangeWrapper(job._id, e.target.value)}
                                                className={`w-full px-4 py-3 pr-10 rounded-xl border appearance-none ${statusStyles} font-bold text-sm focus:outline-none transition-colors border`}
                                            >
                                                <option value="Applied">Applied</option>
                                                <option value="Shortlisted">Shortlisted</option>
                                                <option value="Interview Scheduled">Interview</option>
                                                <option value="Rejected">Rejected</option>
                                                <option value="Offer">Offer</option>
                                                <option value="Accepted">Accepted</option>
                                            </select>
                                            <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 ${statusStyles.split(' ')[0]}`}>
                                                <FaChevronDown className="h-4 w-4" />
                                            </div>
                                            
                                             {interviewInputId === job._id && (
                                                 <div className="absolute top-full left-0 right-0 bg-white border border-slate-200 p-4 rounded-xl shadow-xl z-20 mt-2">
                                                     <p className='mb-3 text-sm font-bold text-slate-700'>Interview Rounds?</p>
                                                     <button 
                                                        className="w-full py-2 rounded-lg bg-blue-600 text-white text-xs font-bold"
                                                        onClick={() => updateJobStatus(job._id, 'Shortlisted', 2, 'HR and Technical')} 
                                                     >
                                                         Confirm (Default: 2)
                                                     </button>
                                                 </div>
                                             )}
                                        </div>
                                    </div>
                                    
                                    {job.interviewDetails && (
                                        <div className="">
                                            <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 px-2.5 py-1.5 rounded-lg text-xs font-bold border border-blue-100">
                                                <FaCheck className="text-[10px]" /> Matches Profile
                                            </span>
                                        </div>
                                    )}
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </>
            )}
        </>
      ) : (
          <MonthlyApplicationsStats />
      )}
      {numOfPages > 1 && <PageBtnContainer />}
    </section>
  );
};

const MonthlyApplicationsStats = () => {
    const { monthlyApplications } = useAppContext();
    return (
        <div className="mt-8 bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h3 className='mb-6 font-bold text-2xl text-slate-800'>Monthly Applications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {monthlyApplications?.map((item, index) => (
                   <div key={index} className="bg-white p-6 rounded-2xl text-center shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                       <h4 className='text-lg mb-2 text-slate-500 font-medium capitalize'>{item.date}</h4>
                       <span className="block text-4xl font-extrabold text-blue-600">{item.count}</span>
                   </div>
               ))}
            </div>
            {!monthlyApplications && <p className="text-slate-500">Loading stats...</p>}
        </div>
    )
}

export default Tracker;
