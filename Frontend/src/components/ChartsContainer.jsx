import React, { useState } from 'react';
import BarChart from './BarChart';
import AreaChart from './AreaChart';
import { useAppContext } from '../context/appContext';
import { motion, AnimatePresence } from 'framer-motion';

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const { monthlyApplications: data } = useAppContext();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className='mt-12 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-8 md:p-10 text-center relative overflow-hidden'
    >
        {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent pointer-events-none" />

      <div className="flex flex-col md:flex-row justify-between items-center mb-10 relative z-10">
         <h4 className='font-bold text-2xl md:text-3xl text-slate-800 tracking-tight'>Monthly Applications</h4>
         
         <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 mt-4 md:mt-0">
             <button 
                type='button' 
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${barChart ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`} 
                onClick={() => setBarChart(true)}
             >
               Bar Chart
             </button>
             <button 
                type='button' 
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${!barChart ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`} 
                onClick={() => setBarChart(false)}
             >
               Area Chart
             </button>
         </div>
      </div>

      <div className="w-full relative z-10 min-h-[300px]">
          <AnimatePresence mode="wait">
             <motion.div
                key={barChart ? 'bar' : 'area'}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full h-[350px]"
             >
               {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
             </motion.div>
          </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ChartsContainer;
