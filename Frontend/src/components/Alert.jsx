import { useAppContext } from '../context/appContext';

const Alert = () => {
  const { alertType, alertText } = useAppContext();
  return (
    <div className={`alert alert-${alertType} rounded-md p-3 mb-4 text-center font-medium shadow-sm transition-all duration-300 animate-fade-in`}>
      {alertText}
    </div>
  );
};

export default Alert;
