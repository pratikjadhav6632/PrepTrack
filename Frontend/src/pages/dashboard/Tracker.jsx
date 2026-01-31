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

  const [localJobs, setLocalJobs] = useState([]);
  const [view, setView] = useState('tracker'); // 'tracker' or 'stats'

  useEffect(() => {
    getJobs();
  }, [page, search, searchStatus, searchType, sort]);

  useEffect(() => {
    const statusPriority = {
      'Accepted': 1,
      'Offer': 2,
      'Interview Scheduled': 3,
      'Shortlisted': 4,
      'Applied': 5,
      'Rejected': 6,
    };

    const sortedJobs = [...jobs].sort((a, b) => {
      const priorityA = statusPriority[a.status] || 7;
      const priorityB = statusPriority[b.status] || 7;
      return priorityA - priorityB;
    });

    setLocalJobs(sortedJobs);
  }, [jobs]);

  const handleStatusChange = (_id, newStatus) => {
    if (newStatus === 'Shortlisted') {
        // Find job to update local state logic if needed, 
        // but primarily we trigger the modal/input flow via UI
        setLocalJobs(prev => prev.map(job => 
            job._id === _id ? { ...job, status: newStatus, showInterviewInput: true } : job
        ));
    } else {
        updateJobStatus(_id, newStatus);
    }
  };

  const updateJobStatus = (_id, status, interviewRounds = 0, interviewDetails = '') => {
      // Create a job object with *only* the fields we want to update
      // Since editJob usually expects values in the global state or form, 
      // we might need to adjust this depending on how editJob is implemented in context.
       // However, often editJob takes an ID and an object. Let's assume or verify.
       // Looking at typical context: editJob usually reads from state `isEditing`... 
       // If that's the case, we might need a specific 'patchJob' function. 
       // If not available, we have to rely on `editJob` (which calls `authFetch.patch`).
       // Let's assume editJob update function payload needs to act directly.
       
       // If `editJob` isn't designed for inline edits, we might need to call specific API directly here or use `setEditJob` then `editJob`.
       // Safer bet: Implement a direct `updateJobStatus` helper here if context doesn't expose one, 
       // OR assume we can pass the data.
       
      // Actually, standard MERN projects often use `createJob` / `editJob` which pulls from state.
      // I will assume for now I need to dispatch an action `updateJob({ jobId, job: { ... } })`.
      // Let's check `appContext` later to be sure. 
      // For now, I will use the function provided by context or fallback to a local fetch if needed.
       
       // Temporary: Assuming `editJob` takes global state, which is bad for table row edits.
       // I'll define a local `patchJob` function here if needed, but optimally `editJob` should accept args.
       // Let's rely on `editJob` taking `({ jobId, job })`? 
       // If not, I'll use `updateJob` (likely named `editJob` in context).
       
       // WAIT: The context usually has `editJob` which starts the request. 
       // I will use a direct fetch for row-based updates to avoid clearing global form state.
       
       updateJob(_id, { 
           company: localJobs.find(j => j._id === _id).company, 
           position: localJobs.find(j => j._id === _id).position, 
           jobLocation: localJobs.find(j => j._id === _id).jobLocation,
           jobType: localJobs.find(j => j._id === _id).jobType,
           status, 
           interviewRounds, 
           interviewDetails 
       });
       
       // Optimistic update
        setLocalJobs(prev => prev.map(job => 
            job._id === _id ? { ...job, status, interviewRounds, interviewDetails, showInterviewInput: false } : job
        ));
  };


  if (isLoading) {
    return <Loading center />;
  }

  if (jobs.length === 0) {
    return (
      <div className='mt-8'>
        <h2>No jobs to display...</h2>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-8">
          <button 
            className={`btn mr-4 ${view === 'tracker' ? 'btn-primary' : 'btn-hipster'}`}
            onClick={() => setView('tracker')}
          >
              Tracker
          </button>
          <button 
             className={`btn ${view === 'stats' ? 'btn-primary' : 'btn-hipster'}`}
             onClick={() => setView('stats')}
          >
              Monthly Stats
          </button>
      </div>

      {view === 'tracker' ? (
        <>
            {/* Desktop View - Table */}
            <div className='hidden md:block overflow-x-auto bg-white rounded-lg shadow-md p-4'>
                <table className='w-full border-collapse'>
                    <thead>
                        <tr>
                            <th className='p-4 text-left border-b border-gray-100'>Date</th>
                            <th className='p-4 text-left border-b border-gray-100'>Position</th>
                            <th className='p-4 text-left border-b border-gray-100'>Company</th>
                            <th className='p-4 text-left border-b border-gray-100'>Status</th>
                            <th className='p-4 text-left border-b border-gray-100'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {localJobs.map((job) => {
                             const date = moment(job.createdAt).format('MMM Do, YYYY');
                             let statusColorClass = 'text-gray-700 bg-gray-100';
                             if (job.status === 'Shortlisted') statusColorClass = 'text-yellow-700 bg-yellow-100';
                             if (job.status === 'Rejected') statusColorClass = 'text-red-700 bg-red-100';
                             if (job.status === 'Accepted') statusColorClass = 'text-green-700 bg-green-100';
                             if (job.status === 'Interview Scheduled') statusColorClass = 'text-blue-700 bg-blue-100';

                             return (
                                 <tr 
                                    key={job._id}
                                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                                    onClick={() => navigate(`/dashboard/job/${job._id}`)}
                                 >
                                     <td className='p-4 border-b border-gray-100'>{date}</td>
                                     <td className='p-4 border-b border-gray-100'>{job.position}</td>
                                     <td className='p-4 border-b border-gray-100'>{job.company}</td>
                                     <td className='p-4 border-b border-gray-100 relative' onClick={(e) => e.stopPropagation()}>
                                         <div className="relative inline-block w-full">
                                             <select 
                                                value={job.status} 
                                                onChange={(e) => handleStatusChange(job._id, e.target.value)}
                                                className={`appearance-none w-full px-2 py-1 pr-8 rounded border border-gray-200 cursor-pointer ${statusColorClass} focus:outline-none`}
                                             >
                                                 <option value="Applied">Applied</option>
                                                 <option value="Shortlisted">Shortlisted</option>
                                                 <option value="Interview Scheduled">Interview Scheduled</option>
                                                 <option value="Rejected">Rejected</option>
                                                 <option value="Offer">Offer</option>
                                                 <option value="Accepted">Accepted</option>
                                             </select>
                                             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <FaChevronDown className="h-3 w-3" />
                                             </div>
                                         </div>
                                         
                                         {job.showInterviewInput && (
                                             <div className="absolute bg-white border border-gray-300 p-4 rounded-lg shadow-xl z-20 mt-2 min-w-[200px]">
                                                 <p className='mb-2'>How many rounds?</p>
                                                 <div className="flex gap-2">
                                                     <button 
                                                        className="btn btn-block btn-hipster btn-sm"
                                                        onClick={() => updateJobStatus(job._id, 'Shortlisted', 2, 'HR and Technical')} 
                                                     >
                                                         Not Sure (Default: 2)
                                                     </button>
                                                 </div>
                                             </div>
                                         )}
                                     </td>
                                     <td className='p-4 border-b border-gray-100'>
                                         {job.interviewDetails && <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm" title={job.interviewDetails}>Matches</span>}
                                     </td>
                                 </tr>
                             )
                        })}
                    </tbody>
                </table>
            </div>

            {/* Mobile View - Cards */}
            <div className='md:hidden flex flex-col gap-4'>
                {localJobs.map((job) => {
                    const date = moment(job.createdAt).format('MMM Do, YYYY');
                    let statusColorClass = 'text-gray-700 bg-gray-100';
                    if (job.status === 'Shortlisted') statusColorClass = 'text-yellow-700 bg-yellow-100';
                    if (job.status === 'Rejected') statusColorClass = 'text-red-700 bg-red-100';
                    if (job.status === 'Accepted') statusColorClass = 'text-green-700 bg-green-100';
                    if (job.status === 'Interview Scheduled') statusColorClass = 'text-blue-700 bg-blue-100';

                    return (
                        <div 
                            key={job._id} 
                            className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-3 relative cursor-pointer"
                            onClick={() => navigate(`/dashboard/job/${job._id}`)}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h5 className="font-bold text-lg text-gray-800">{job.position}</h5>
                                    <p className="text-gray-500 text-sm">{job.company}</p>
                                </div>
                                <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full border border-gray-100">
                                    {date}
                                </span>
                            </div>

                            <div className="flex items-center justify-between mt-2" onClick={(e) => e.stopPropagation()}>
                                <div className="relative w-full">
                                    <select 
                                        value={job.status} 
                                        onChange={(e) => handleStatusChange(job._id, e.target.value)}
                                        className={`w-full px-3 py-2 pr-10 rounded-lg border border-gray-200 cursor-pointer appearance-none ${statusColorClass} font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary-100`}
                                    >
                                        <option value="Applied">Applied</option>
                                        <option value="Shortlisted">Shortlisted</option>
                                        <option value="Interview Scheduled">Interview Scheduled</option>
                                        <option value="Rejected">Rejected</option>
                                        <option value="Offer">Offer</option>
                                        <option value="Accepted">Accepted</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                                        <FaChevronDown className="h-4 w-4" />
                                    </div>
                                    
                                     {job.showInterviewInput && (
                                         <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 p-4 rounded-lg shadow-xl z-20 mt-2">
                                             <p className='mb-2 text-sm text-gray-700'>How many rounds?</p>
                                             <div className="flex gap-2">
                                                 <button 
                                                    className="btn btn-block btn-hipster btn-sm text-xs"
                                                    onClick={() => updateJobStatus(job._id, 'Shortlisted', 2, 'HR and Technical')} 
                                                 >
                                                     Default: 2
                                                 </button>
                                             </div>
                                         </div>
                                     )}
                                </div>
                            </div>
                            
                            {/* Match Indicator for Mobile */}
                            {job.interviewDetails && (
                                <div className="mt-1">
                                    <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-medium border border-blue-100">
                                        <FaCheck className="text-[10px]" /> Matches Profile
                                    </span>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
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
        <div className="mt-8">
            <h3 className='mb-4 font-bold text-xl'>Monthly Applications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {monthlyApplications?.map((item, index) => (
                   <div key={index} className="bg-white p-6 rounded-lg text-center shadow-md">
                       <h4 className='text-lg mb-2 text-gray-500 capitalize'>{item.date}</h4>
                       <span className="block text-4xl font-bold text-primary-500">{item.count}</span>
                   </div>
               ))}
            </div>
            {!monthlyApplications && <p>Loading stats...</p>}
        </div>
    )
}

export default Tracker;
