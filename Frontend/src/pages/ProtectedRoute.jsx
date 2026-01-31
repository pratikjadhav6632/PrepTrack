import { Navigate } from 'react-router-dom';

import { useAppContext } from '../context/appContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAppContext();
  // Temporary: Allow access for development until Auth is connected
  // return children; 
  // Proper logic:
  if (!user) {
    return <Navigate to='/' />;
  }
  return children;
};

export default ProtectedRoute;
