import { useAppContext } from '../context/appContext';
import StatItem from './StatItem';
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const StatsContainer = () => {
  const { stats, handleChange } = useAppContext();
  const navigate = useNavigate();
  
  const defaultStats = [
    {
      title: 'pending applications',
      count: stats['Applied'] || 0,
      icon: <FaSuitcaseRolling />,
      color: '#e9b949',
      bcg: '#fcefc7',
      status: 'Applied',
    },
    {
      title: 'interviews scheduled',
      count: stats['Interview Scheduled'] || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
      status: 'Interview Scheduled',
    },
    {
      title: 'jobs declined',
      count: stats['Rejected'] || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
      status: 'Rejected',
    },
  ];

  const handleItemClick = (status) => {
    handleChange({ name: 'search', value: '' });
    handleChange({ name: 'searchType', value: 'all' });
    handleChange({ name: 'searchStatus', value: status });
    navigate('/dashboard/tracker');
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
      {defaultStats.map((item, index) => {
        return (
          <div 
            key={index} 
            onClick={() => handleItemClick(item.status)}
            className='cursor-pointer'
          >
            <StatItem {...item} />
          </div>
        );
      })}
    </div>
  );
};

export default StatsContainer;
