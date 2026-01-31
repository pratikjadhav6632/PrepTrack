const StatItem = ({ count, title, icon, color, bcg }) => {
  return (
    <article className='p-6 bg-white rounded-2xl shadow-lg border-l-8 transition-transform hover:scale-105 duration-300' style={{ borderLeftColor: color }}>
      <header className='flex items-center justify-between mb-4'>
        <span className='count block font-extrabold text-5xl tracking-tighter' style={{ color: color }}>
          {count}
        </span>
        <div className='icon w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm' style={{ background: bcg, color: color }}>
          {icon}
        </div>
      </header>
      <h5 className='title m-0 capitalize tracking-wide text-slate-500 font-semibold text-lg'>{title}</h5>
    </article>
  );
};

export default StatItem;
