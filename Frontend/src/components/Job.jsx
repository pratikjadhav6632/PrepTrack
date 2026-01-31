import moment from 'moment';
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

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

  return (
    <article className='bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-100 flex flex-col justify-between'> 
      <header className='p-6 border-b border-slate-50 flex items-center gap-4 bg-slate-50/50 rounded-t-2xl'>
        <div className='w-14 h-14 grid place-items-center bg-gradient-to-br from-primary-500 to-indigo-600 rounded-xl text-2xl font-bold text-white uppercase shadow-md'>
            {company.charAt(0)}
        </div>
        <div>
          <h5 className='mb-1 font-bold text-xl text-slate-800 tracking-tight'>{position}</h5>
          <p className='m-0 capitalize text-slate-500 font-medium tracking-wide'>{company}</p>
        </div>
      </header>
      <div className='p-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-y-4 items-center mb-6'>
          <div className='flex items-center gap-3 text-slate-600 tracking-wide capitalize group'>
              <FaLocationArrow className='text-slate-400 group-hover:text-primary-500 transition-colors' />
              {jobLocation}
          </div>
          <div className='flex items-center gap-3 text-slate-600 tracking-wide capitalize group'>
              <FaCalendarAlt className='text-slate-400 group-hover:text-primary-500 transition-colors' />
              {date}
          </div>
          <div className='flex items-center gap-3 text-slate-600 tracking-wide capitalize group'>
              <FaBriefcase className='text-slate-400 group-hover:text-primary-500 transition-colors' />
              {jobType}
          </div>
          <div className={`capitalize tracking-wide text-center w-28 py-1.5 rounded-full text-sm font-semibold shadow-sm ${
              status === 'pending' || status === 'Pending' ? 'text-yellow-700 bg-yellow-100 border border-yellow-200' 
              : status === 'interview' || status === 'Interview' ? 'text-indigo-700 bg-indigo-100 border border-indigo-200'
              : status === 'declined' || status === 'Declined' ? 'text-red-700 bg-red-100 border border-red-200'
              : 'text-blue-700 bg-blue-100 border border-blue-200' // Default
          }`}>
              {status}
          </div>
        </div>
        <footer className='border-t border-slate-50 pt-4 flex gap-3'>
          <Link
            to='/add-job'
            className='btn bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-800 shadow-none h-10 px-6 py-2 flex items-center gap-2 rounded-lg transition-colors font-medium border border-green-200'
            onClick={() => setEditJob(_id)}
          >
            Edit
          </Link>
          <button
            type='button'
            className='btn bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800 shadow-none h-10 px-6 py-2 flex items-center gap-2 rounded-lg transition-colors font-medium border border-red-200'
            onClick={() => deleteJob(_id)}
          >
            Delete
          </button>
        </footer>
      </div>
    </article>
  );
};

export default Job;
