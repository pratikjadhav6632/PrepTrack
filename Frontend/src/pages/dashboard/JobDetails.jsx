import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';
import Loading from '../../components/Loading';
import { FormRow } from '../../components';
import { FaArrowLeft } from 'react-icons/fa';
import moment from 'moment';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs, updateJob, isLoading } = useAppContext();
  
  const [job, setJob] = useState(null);
  const [values, setValues] = useState({
    notes: '',
    feedback: '',
    improvement: '',
  });

  useEffect(() => {
    // Try to find job from global state first
    const foundJob = jobs.find((j) => j._id === id);
    if (foundJob) {
      setJob(foundJob);
      setValues({
        notes: foundJob.notes || '',
        feedback: foundJob.feedback || '',
        improvement: foundJob.improvement || '',
      });
    } else {
      // If not found in state (e.g. page reload), we might need to fetch it?
      // For now, let's redirect to tracker or show not found. 
      // Ideally we should implement a getJob(id) in context/backend.
      // But keeping it simple for now as requested by user flow "click from tracker".
      // If jobs are empty (reload), we might want to trigger getJobs() ??
      // BUT getJobs depends on search/filter which might exclude this job.
      // Let's assume for this specific task flow, the user comes from Tracker.
    }
  }, [id, jobs]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateJob(id, values);
    // Optionally show success or redirect
  };

  if (isLoading) return <Loading center />;
  if (!job) return (
      <div className='text-center mt-10'>
          <h3>Job not found or loading...</h3>
          <Link to='/dashboard/tracker' className='btn btn-primary mt-4'>Back to Tracker</Link>
      </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <header className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
        <Link to='/dashboard/tracker' className='btn btn-hipster btn-sm'>
            <FaArrowLeft /> Back
        </Link>
        <div>
            <h2 className="text-2xl font-bold text-gray-800">{job.position}</h2>
            <p className="text-gray-500">{job.company}</p>
        </div>
        <div className={`ml-auto px-3 py-1 rounded-full text-sm font-semibold capitalize
            ${job.status === 'Accepted' ? 'bg-green-100 text-green-700' : 
              job.status === 'Rejected' ? 'bg-red-100 text-red-700' : 
              'bg-blue-100 text-blue-700'}`}>
            {job.status}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
              <h4 className="font-bold text-lg mb-2">Job Details</h4>
              <p><span className="font-semibold">Location:</span> {job.jobLocation}</p>
              <p><span className="font-semibold">Type:</span> {job.jobType}</p>
              <p><span className="font-semibold">Applied:</span> {moment(job.createdAt).format('MMM Do, YYYY')}</p>
              <p><span className="font-semibold">Platform:</span> {job.source || 'N/A'}</p>
          </div>
          
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="form-group">
            <label className="font-bold text-gray-700 mb-2 block">Notes / Todo</label>
            <textarea 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200 h-32"
                name="notes"
                value={values.notes}
                onChange={handleChange}
                placeholder="Ex: Prepare for technical round, Research company values..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label className="font-bold text-gray-700 mb-2 block">Interview Feedback</label>
                <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200 h-32"
                    name="feedback"
                    value={values.feedback}
                    onChange={handleChange}
                    placeholder="Ex: Interviewer asked about React hooks, System Design..."
                />
              </div>

              <div className="form-group">
                <label className="font-bold text-gray-700 mb-2 block">Areas for Improvement</label>
                <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200 h-32"
                    name="improvement"
                    value={values.improvement}
                    onChange={handleChange}
                    placeholder="Ex: Check out more on Docker, Practice generic algorithm questions..."
                />
              </div>
          </div>

          <button type="submit" className="btn btn-primary self-end px-8 py-3">
              Save Changes
          </button>
      </form>
    </div>
  );
};

export default JobDetails;
