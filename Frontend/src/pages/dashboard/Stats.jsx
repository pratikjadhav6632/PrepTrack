import { useEffect } from 'react';
import { useAppContext } from '../../context/appContext';
import { StatsContainer, Loading, ChartsContainer } from '../../components';

const Stats = () => {
  const { showStats, isLoading, monthlyApplications } = useAppContext();

  useEffect(() => {
    showStats();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <section className="min-h-[80vh] w-full relative font-sans">
       {/* Ambient Background Gradient */}
       <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-[5%] right-[20%] w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
          <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-3xl" />
       </div>

      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </section>
  );
};

export default Stats;
