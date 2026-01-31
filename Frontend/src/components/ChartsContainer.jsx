import React, { useState } from 'react';
import BarChart from './BarChart';
import AreaChart from './AreaChart';
import { useAppContext } from '../context/appContext';

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const { monthlyApplications: data } = useAppContext();

  return (
    <div className='mt-16 text-center bg-white p-6 rounded-2xl shadow-xl border border-slate-100'>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 px-4">
         <h4 className='font-bold text-3xl text-slate-800 tracking-tight'>Monthly Applications</h4>
         <button type='button' className='btn text-primary-500 bg-primary-50 hover:bg-primary-100 font-bold py-2 px-6 rounded-full transition-all mt-4 md:mt-0 shadow-sm' onClick={() => setBarChart(!barChart)}>
           {barChart ? 'Switch to Area Chart' : 'Switch to Bar Chart'}
         </button>
      </div>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </div>
  );
};

export default ChartsContainer;
