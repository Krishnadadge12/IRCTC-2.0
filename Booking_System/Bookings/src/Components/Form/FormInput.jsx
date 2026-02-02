import React from 'react';

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
       {/* Input Label */}
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

       {/* Input Field */}
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
       {/* Validation Error */}
      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default FormInput;

