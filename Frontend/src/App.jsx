import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import './App.css'; 
import './index.css';

// Pages
import { Landing, Register, Error, ProtectedRoute } from './pages';
import { AddJob, Profile, Stats, SharedLayout, Tracker, JobDetails } from './pages/dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Stats />} />
          <Route path='add-job' element={<AddJob />} />
          <Route path='tracker' element={<Tracker />} />
          <Route path='job/:id' element={<JobDetails />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='*' element={<Error />} />
      </Routes>
      <ToastContainer position='top-center' />
    </BrowserRouter>
  );
}

export default App;
