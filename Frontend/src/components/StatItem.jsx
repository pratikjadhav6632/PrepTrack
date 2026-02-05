import { motion } from 'framer-motion';

const StatItem = ({ count, title, icon, color, bcg, className }) => {
  return (
    <motion.article 
      whileHover={{ y: -5, scale: 1.02 }}
      className={`p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 relative overflow-hidden group transition-all duration-300 ${className}`}
    >
      {/* Decorative background glow */}
      <div 
        className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-20 blur-2xl transition-transform duration-500 group-hover:scale-150" 
        style={{ backgroundColor: color }}
      />

      <header className='flex items-center justify-between mb-6 relative z-10'>
        <span 
            className='count block font-extrabold text-6xl tracking-tighter drop-shadow-sm' 
            style={{ color: color }}
        >
          {count}
        </span>
        <div 
            className='icon w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm transform group-hover:rotate-12 transition-transform duration-300' 
            style={{ background: bcg, color: color }}
        >
          {icon}
        </div>
      </header>
      
      <h5 className='title m-0 capitalize tracking-wide text-slate-500 font-bold text-lg relative z-10 pl-1 border-l-4 border-transparent group-hover:border-[color:var(--border-color)] transition-all' style={{ '--border-color': color }}>
        {title}
      </h5>
    </motion.article>
  );
};

export default StatItem;
