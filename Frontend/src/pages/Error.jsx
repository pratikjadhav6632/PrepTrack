import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <main className='w-full min-h-screen flex items-center justify-center flex-col text-center bg-slate-50'>
        <div className="relative">
            <h1 className='text-9xl font-extrabold text-primary-500 opacity-20 select-none'>404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
                <h3 className='text-3xl font-bold text-slate-800 tracking-tight'>Page Not Found</h3>
            </div>
        </div>
      <p className='text-slate-500 mb-8 text-lg max-w-md mx-auto'>We can't seem to find the page you're looking for. It might have been moved or deleted.</p>
      <Link to='/' className='btn text-white bg-primary-500 hover:bg-primary-600 px-6 py-3 rounded-lg shadow-lg font-semibold tracking-wide transition-all hover:-translate-y-1'>
        Back Home
      </Link>
    </main>
  );
};

export default Error;
