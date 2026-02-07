/**
 * Validation utility functions
 */

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // At least 6 characters
  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters long.' };
  }
  return { isValid: true, message: '' };
};

export const validateUsername = (username) => {
  const trimmed = username.trim();
  if (!trimmed) {
    return { isValid: false, message: 'Username is required.' };
  }
  if (trimmed.length < 3) {
    return { isValid: false, message: 'Username must be at least 3 characters long.' };
  }
  if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
    return { isValid: false, message: 'Username can only contain letters, numbers, and underscores.' };
  }
  return { isValid: true, message: '' };
};

export const validateMobile = (mobile) => {
  const trimmed = mobile.trim();
  if (!trimmed) {
    return { isValid: false, message: 'Mobile number is required.' };
  }
  if (!/^\d{10}$/.test(trimmed)) {
    return { isValid: false, message: 'Please enter a valid 10-digit mobile number.' };
  }
  return { isValid: true, message: '' };
};

export const validateFullName = (fullname) => {
  const trimmed = fullname.trim();
  if (!trimmed) {
    return { isValid: false, message: 'Full name is required.' };
  }
  if (trimmed.length < 2) {
    return { isValid: false, message: 'Full name must be at least 2 characters long.' };
  }
  if (!/^[a-zA-Z\s]+$/.test(trimmed)) {
    return { isValid: false, message: 'Full name can only contain letters and spaces.' };
  }
  return { isValid: true, message: '' };
};

export const validateRequired = (value, fieldName) => {
  if (!value || !value.trim()) {
    return { isValid: false, message: `${fieldName} is required.` };
  }
  return { isValid: true, message: '' };
};

