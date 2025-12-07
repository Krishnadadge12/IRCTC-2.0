import React from 'react';

/**
 * Reusable Form Button Component
 */
const FormButton = ({
  type = 'button',
  children,
  onClick,
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
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <span className="spinner"></span>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default FormButton;

