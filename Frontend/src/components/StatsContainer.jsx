import { useAppContext } from '../context/appContext';
import StatItem from './StatItem';
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const StatsContainer = () => {
  const { stats, handleChange } = useAppContext();
  const navigate = useNavigate();
  
  const defaultStats = [
    {
      title: 'pending applications',
      count: stats['Applied'] || 0,
      icon: <FaSuitcaseRolling />,
      color: '#2563eb', // blue-600
      bcg: '#eff6ff',   // blue-50
      status: 'Applied',
    },
    {
      title: 'interviews scheduled',
      count: stats['Interview Scheduled'] || 0,
      icon: <FaCalendarCheck />,
      color: '#4f46e5', // indigo-600
      bcg: '#eef2ff',   // indigo-50
      status: 'Interview Scheduled',
    },
    {
      title: 'jobs declined',
      count: stats['Rejected'] || 0,
      icon: <FaBug />,
      color: '#e11d48', // rose-600
      bcg: '#fff1f2',   // rose-50
      status: 'Rejected',
    },
  ];

  const handleItemClick = (status) => {
    handleChange({ name: 'search', value: '' });
    handleChange({ name: 'searchType', value: 'all' });
    handleChange({ name: 'searchStatus', value: status });
    navigate('/dashboard/tracker');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'
    >
      {defaultStats.map((item, index) => {
        return (
          <motion.div 
            key={index} 
            variants={itemVariants}
            onClick={() => handleItemClick(item.status)}
            className='cursor-pointer'
          >
            <StatItem {...item} />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default StatsContainer;
