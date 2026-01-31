const FormRowSelect = ({ labelText, name, value, handleChange, list }) => {
  return (
    <div className='mb-4'>
      <label htmlFor={name} className='form-label capitalize'>
        {labelText || name}
      </label>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className='form-input'
      >
        {list.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
