import { FormRow, FormRowSelect } from '../../components';
import { useAppContext } from '../../context/appContext';

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

  return (
    <div className='bg-white rounded-2xl shadow-xl w-full p-8 md:p-12 transition-all hover:shadow-2xl border border-slate-100'>
      <form className='w-full'>
        <h3 className='text-3xl font-extrabold mb-8 text-slate-800 tracking-tight capitalize'>{isEditing ? 'Edit Job' : 'Add New Job'}</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {/* position */}
          <div className="group">
             <FormRow
               type='text'
               name='position'
               value={position}
               handleChange={handleJobInput}
               placeholder='e.g. Frontend Developer'
             />
          </div>
          {/* company */}
          <div className="group">
            <FormRow
              type='text'
              name='company'
              value={company}
              handleChange={handleJobInput}
              placeholder='e.g. Google'
            />
          </div>
          {/* location */}
          <div className="group">
            <FormRow
              type='text'
              labelText='job location'
              name='jobLocation'
              value=''
              handleChange={handleJobInput}
              placeholder='e.g. New York, NY'
            />
          </div>
          {/* status */}
          {isEditing && (
            <FormRowSelect
              name='status'
              value={status}
              handleChange={handleJobInput}
              list={statusOptions}
            />
          )}
          {/* platform */}
          <div className="group">
             <FormRow
               type='text'
               name='source'
               labelText='Platform'
               value={source}
               handleChange={handleJobInput}
               list='platformOptions'
               placeholder='e.g. LinkedIn'
             />
             <datalist id='platformOptions'>
               {sourceOptions.map((item, index) => {
                 return <option key={index} value={item} />;
               })}
             </datalist>
          </div>
          {/* job type */}
          <FormRowSelect
            name='jobType'
            labelText='job type'
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          <div className='flex items-end gap-4'>
            <button
              type='submit'
              className='btn w-full h-[42px] mt-4 bg-gradient-to-r from-primary-500 to-indigo-600 hover:from-primary-600 hover:to-indigo-700 shadow-md transition-all transform active:scale-95' // aligned with inputs
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Submit'}
            </button>
            <button
              className='btn w-full bg-slate-200 text-slate-700 hover:bg-slate-300 h-[42px] mt-4 shadow-sm transition-colors'
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
