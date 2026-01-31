const FormRow = ({ type, name, value, handleChange, labelText, list, placeholder }) => {
  return (
    <div className='mb-4'>
      <label htmlFor={name} className='form-label capitalize'>
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className='form-input'
        list={list}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormRow;
