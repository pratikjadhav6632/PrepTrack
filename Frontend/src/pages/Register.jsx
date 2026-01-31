import { useState, useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import { Alert } from '../components';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

function Register({ onClose }) { // Added onClose prop if needed, though redirect handles it
  const [values, setValues] = useState(initialState);
  const { user, isLoading, showAlert, displayAlert, registerUser, loginUser } = useAppContext();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password };
    if (isMember) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  // Removed internal navigation. Local user change triggers Landing's useEffect.

  return (
    <section className='p-8'> 
        {/* Removed min-h-screen and page background, kept inner form padding */}
        <form className='w-full' onSubmit={onSubmit}>
        <div className="flex justify-center mb-6">
           <span className="bg-primary-500 text-white rounded-lg px-3 py-1 text-3xl font-extrabold shadow-lg">J</span>
        </div>
        <h3 className='text-center text-3xl font-bold mb-6 text-slate-800 tracking-tight'>
          {values.isMember ? 'Welcome Back!' : 'Create Account'}
        </h3>
        {showAlert && <Alert />}
        
        {/* name field */}
        {!values.isMember && (
           <div className='mb-4 group'>
             <label className='form-label group-focus-within:text-primary-500 transition-colors'>Name</label>
             <input type='text' name='name' value={values.name} onChange={handleChange} className='form-input' placeholder='e.g. John Doe' />
           </div>
        )}
        
        {/* email field */}
        <div className='mb-4 group'>
            <label className='form-label group-focus-within:text-primary-500 transition-colors'>Email</label>
            <input type='email' name='email' value={values.email} onChange={handleChange} className='form-input' placeholder='e.g. john@example.com' />
        </div>

        {/* password field */}
        <div className='mb-6 group'>
            <label className='form-label group-focus-within:text-primary-500 transition-colors'>Password</label>
            <input type='password' name='password' value={values.password} onChange={handleChange} className='form-input' placeholder='Enter your password' />
        </div>

        <button type='submit' className='btn btn-block mb-4 py-3 text-lg font-bold bg-gradient-to-r from-primary-500 to-indigo-600 hover:from-primary-600 hover:to-indigo-700 shadow-lg transform active:scale-95 transition-all' disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
        
        <p className='text-center m-0 text-slate-600 mt-4'>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type='button' onClick={toggleMember} className='text-primary-600 font-bold ml-2 cursor-pointer bg-transparent border-0 hover:underline transition-all'>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </section>
  );
}

export default Register;

