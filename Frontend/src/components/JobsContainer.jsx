import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';
import Job from './Job';
import Loading from './Loading';

const JobsContainer = () => {
  const { getJobs, jobs, isLoading, totalJobs } = useAppContext();

  useEffect(() => {
    getJobs();
  }, []);

  if (isLoading) {
    return (
        <Loading center />
    );
  }

  if (jobs.length === 0) {
    return (
      <div className='mt-8'>
        <h2 className='text-2xl font-bold'>No jobs to display...</h2>
      </div>
    );
  }

  return (
    <div className='mt-16'>
      <h5 className='mb-6 font-bold uppercase'>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
    </div>
  );
};

export default JobsContainer;
