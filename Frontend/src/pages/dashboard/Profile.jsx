import { useState } from 'react';
import { FormRow } from '../../components';
import { useAppContext } from '../../context/appContext';

const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } = useAppContext();

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !lastName || !location) {
      displayAlert();
      return;
    }
    updateUser({ name, email, lastName, location });
  };

  return (
    <div className='bg-white rounded-2xl shadow-xl w-full p-8 md:p-12 transition-all hover:shadow-2xl border border-slate-100'>
      <form className='w-full' onSubmit={handleSubmit}>
        <h3 className='text-3xl font-extrabold mb-8 text-slate-800 tracking-tight'>Profile</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <FormRow
            type='text'
            name='name'
            value={name}
            handleChange={(e) => setName(e.target.value)}
            placeholder='e.g. John'
          />
          <FormRow
            type='text'
            labelText='last name'
            name='lastName'
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
            placeholder='e.g. Doe'
          />
          <FormRow
            type='email'
            name='email'
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
            placeholder='e.g. john@example.com'
          />
          <FormRow
            type='text'
            name='location'
            value={location}
            handleChange={(e) => setLocation(e.target.value)}
            placeholder='e.g. New York, NY'
          />
          <button className='btn w-full h-[42px] mt-4 bg-gradient-to-r from-primary-500 to-indigo-600 hover:from-primary-600 hover:to-indigo-700 shadow-md transition-all transform active:scale-95' type='submit' disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
