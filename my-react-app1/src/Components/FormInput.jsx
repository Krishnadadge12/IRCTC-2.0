import React from 'react';
import './FormInput.css';

/**
 * Reusable Form Input Component
 */
const FormInput = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required = false,
  className = '',
  inputClassName = '',
  ...props
}) => {
  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
          {required && <span className="form-input-required">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`form-input ${error ? 'input-error' : ''} ${inputClassName}`}
        {...props}
      />
      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default FormInput;

