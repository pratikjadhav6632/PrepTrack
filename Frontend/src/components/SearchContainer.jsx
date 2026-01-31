import { FormRow, FormRowSelect } from '.';
import { useAppContext } from '../context/appContext';

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
    <div className='bg-white rounded-2xl shadow-xl w-full p-8 mb-12 border border-slate-100 transition-all hover:shadow-2xl'>
      <form className='w-full'>
        <h3 className='text-3xl font-extrabold mb-8 text-slate-800 tracking-tight'>Search & Filter</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {/* search position */}
          <div className="group">
             <FormRow
               type='text'
               name='search'
               value={search}
               handleChange={handleSearch}
               placeholder='e.g. Developer'
             />
          </div>
          {/* search by status */}
          <FormRowSelect
            labelText='job status'
            name='searchStatus'
            value={searchStatus}
            handleChange={handleSearch}
            list={['all', ...statusOptions]}
          />
          {/* search by type */}
          <FormRowSelect
            labelText='job type'
            name='searchType'
            value={searchType}
            handleChange={handleSearch}
            list={['all', ...jobTypeOptions]}
          />
          {/* sort */}
          <FormRowSelect
            name='sort'
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <div className="flex items-end">
              <button
                className='btn btn-block bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 font-bold py-2 rounded-lg transition-all shadow-sm h-[42px]' // Align with inputs roughly
                disabled={isLoading}
                onClick={handleSubmit}
              >
                Clear Filters
              </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchContainer;
