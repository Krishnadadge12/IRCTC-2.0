import React from 'react';

/**
 * Reusable Form Button Component
 * ✔ Works with form submit
 * ✔ Loading-safe
 * ✔ Theme-safe
 */
const FormButton = ({
  type = 'submit',            // ✅ default to submit (IMPORTANT)
  children,
  variant = 'primary',
  disabled = false,
  loading = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'form-button';

  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <span className="button-loading">
          <span className="spinner" aria-hidden="true"></span>
          <span className="loading-text">Please wait...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default FormButton;
