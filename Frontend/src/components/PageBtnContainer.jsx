import { useAppContext } from '../context/appContext';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';


const PageBtnContainer = () => {
  const { numOfPages, page, changePage } = useAppContext();

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = 1;
    }
    changePage(newPage);
  };
  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }
    changePage(newPage);
  };

  return (
    <div className='h-24 mt-8 flex items-center justify-end flex-wrap gap-4'>
      <button 
        className='w-24 h-10 bg-white text-primary-500 capitalize flex items-center justify-center gap-2 rounded cursor-pointer transition-all hover:bg-primary-500 hover:text-white border-transparent' 
        onClick={prevPage}
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className='bg-primary-100 rounded'>
        {pages.map((pageNumber) => {
          return (
            <button
              type='button'
              className={`bg-transparent border-transparent w-12 h-10 font-bold text-xl rounded cursor-pointer transition-all ${pageNumber === page ? 'bg-primary-500 text-white' : 'text-primary-500 hover:bg-primary-500 hover:text-white'}`}
              key={pageNumber}
              onClick={() => changePage(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button 
        className='w-24 h-10 bg-white text-primary-500 capitalize flex items-center justify-center gap-2 rounded cursor-pointer transition-all hover:bg-primary-500 hover:text-white border-transparent' 
        onClick={nextPage}
      >
        next
        <HiChevronDoubleRight />
      </button>
    </div>
  );
};


export default PageBtnContainer;
