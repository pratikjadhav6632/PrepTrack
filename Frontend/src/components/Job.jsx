import moment from 'moment';
import { FaLocationArrow, FaBriefcase, FaCalendarAlt, FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import { motion } from 'framer-motion';

const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  status,
}) => {
  const { setEditJob, deleteJob } = useAppContext();

  let date = moment(createdAt);
  date = date.format('MMM Do, YYYY');

  // Status badge styling helper
  const getStatusStyles = (status) => {
      switch(status) {
          case 'pending': 
          case 'Pending': 
          case 'Applied':
            return 'text-blue-600 bg-blue-50 border-blue-100';
          case 'interview': 
          case 'Interview': 
          case 'Interview Scheduled':
            return 'text-indigo-600 bg-indigo-50 border-indigo-100';
          case 'declined': 
          case 'Declined': 
          case 'Rejected':
            return 'text-rose-600 bg-rose-50 border-rose-100';
          case 'Shortlisted':
              return 'text-amber-600 bg-amber-50 border-amber-100';
          case 'Accepted':
              return 'text-emerald-600 bg-emerald-50 border-emerald-100';
          case 'Offer':
              return 'text-purple-600 bg-purple-50 border-purple-100';
          default:
            return 'text-slate-600 bg-slate-50 border-slate-100';
      }
  };

  return (
    <motion.article 
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        className='bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-2xl border border-white/60 flex flex-col justify-between transition-shadow duration-300 relative overflow-hidden group'
    > 
      {/* SearchJobs style header gradient on hover */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <header className='p-6 border-b border-slate-50 flex items-start gap-4'>
        <div className='w-14 h-14 grid place-items-center bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-2xl font-bold text-white uppercase shadow-lg shadow-blue-500/20 transform group-hover:rotate-3 transition-transform duration-300'>
            {company.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <h5 className='mb-1 font-bold text-xl text-slate-800 tracking-tight truncate leading-tight' title={position}>{position}</h5>
          <p className='m-0 capitalize text-slate-500 font-medium tracking-wide truncate'>{company}</p>
        </div>
      </header>

      <div className='p-6 flex-1 flex flex-col'>
        <div className='grid grid-cols-1 gap-y-4 mb-6'>
          <div className='flex items-center gap-3 text-slate-600 font-medium tracking-wide capitalize group/icon'>
              <FaLocationArrow className='text-slate-400 group-hover/icon:text-blue-500 transition-colors' />
              {jobLocation}
          </div>
          <div className='flex items-center gap-3 text-slate-600 font-medium tracking-wide capitalize group/icon'>
              <FaCalendarAlt className='text-slate-400 group-hover/icon:text-blue-500 transition-colors' />
              {date}
          </div>
          <div className='flex items-center gap-3 text-slate-600 font-medium tracking-wide capitalize group/icon'>
              <FaBriefcase className='text-slate-400 group-hover/icon:text-blue-500 transition-colors' />
              {jobType}
          </div>
          
          <div className="mt-2">
             <span className={`inline-block py-1.5 px-4 rounded-full text-xs font-bold border ${getStatusStyles(status)}`}>
               {status}
             </span>
          </div>
        </div>

        <footer className='mt-auto pt-4 border-t border-slate-100 flex gap-3'>
          <Link
            to='/add-job'
            className='flex-1 flex items-center justify-center gap-2 h-10 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 font-semibold text-sm transition-colors border border-emerald-100'
            onClick={() => setEditJob(_id)}
          >
            <FaEdit className="text-xs" /> Edit
          </Link>
          <button
            type='button'
            className='flex-1 flex items-center justify-center gap-2 h-10 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 font-semibold text-sm transition-colors border border-rose-100'
            onClick={() => deleteJob(_id)}
          >
            <FaTrash className="text-xs" /> Delete
          </button>
        </footer>
      </div>
    </motion.article>
  );
};

export default Job;
