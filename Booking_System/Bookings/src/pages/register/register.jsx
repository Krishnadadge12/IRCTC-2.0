import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  validateEmail,
  validatePassword,
  validateUsername,
  validateMobile,
  validateFullName,
  validateRequired,
} from '../../utils/validation';
import FormInput from '../../Components/Form/FormInput';
import FormButton from '../../Components/Form/FormButton';
import './register.css';

const Registration = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    fullname: '',
    password: '',
    confirmPassword: '',
    email: '',
    isd: '+91 - India',
    mobile: '',
    captchaInput: '',
  });
  const [errors, setErrors] = useState({});
  const [captcha, setCaptcha] = useState({ q: '', a: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    setCaptcha({ q: `${a} + ${b} = ?`, a: String(a + b) });
    setForm((prev) => ({ ...prev, captchaInput: '' }));
    setErrors((prev) => ({ ...prev, captchaInput: '' }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate username
    const usernameValidation = validateUsername(form.username);
    if (!usernameValidation.isValid) {
      newErrors.username = usernameValidation.message;
    }

    // Validate full name
    const fullnameValidation = validateFullName(form.fullname);
    if (!fullnameValidation.isValid) {
      newErrors.fullname = fullnameValidation.message;
    }

    // Validate password
    const passwordValidation = validatePassword(form.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.message;
    }

    // Validate confirm password
    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    // Validate email
    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!validateEmail(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Validate mobile
    const mobileValidation = validateMobile(form.mobile);
    if (!mobileValidation.isValid) {
      newErrors.mobile = mobileValidation.message;
    }

    // Validate captcha
    if (!form.captchaInput.trim()) {
      newErrors.captchaInput = 'Please solve the captcha.';
    } else if (form.captchaInput.trim() !== captcha.a) {
      newErrors.captchaInput = 'Incorrect captcha answer. Please try again.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix all errors before submitting.');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const users = JSON.parse(localStorage.getItem('users') || '[]');

      // Check if username already exists
      if (users.find((u) => u.username === form.username.trim())) {
        toast.error('Username already exists. Please choose a different one.');
        setErrors({ username: 'Username already exists.' });
        setIsLoading(false);
        return;
      }

      // Check if email already exists
      if (users.find((u) => u.email === form.email.trim())) {
        toast.error('Email already registered. Please use a different email.');
        setErrors({ email: 'Email already registered.' });
        setIsLoading(false);
        return;
      }

      const user = {
        username: form.username.trim(),
        fullname: form.fullname.trim(),
        password: form.password,
        email: form.email.trim(),
        isd: form.isd,
        mobile: form.mobile.trim(),
      };

      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));

      toast.success('Registration successful! Redirecting to login...');
      
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      toast.error('An error occurred during registration. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-header">
          <h2>Create Account</h2>
          <p className="register-subtitle">Join us today! Fill in your details to get started.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="register-form">
          <div className="form-row">
            <FormInput
              label="Username"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              error={errors.username}
              placeholder="Enter username"
              required
              autoComplete="username"
            />
          </div>

          <div className="form-row">
            <FormInput
              label="Full Name"
              name="fullname"
              type="text"
              value={form.fullname}
              onChange={handleChange}
              error={errors.fullname}
              placeholder="Enter your full name"
              required
              autoComplete="name"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="password-input-wrapper">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter password (min. 6 characters)"
                  className={`form-input ${errors.password ? 'input-error' : ''}`}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.password && (
                <div className="error-message" role="alert">
                  {errors.password}
                </div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="password-input-wrapper">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="error-message" role="alert">
                  {errors.confirmPassword}
                </div>
              )}
            </div>
          </div>

          <div className="info-box">
            <span className="info-icon">ℹ️</span>
            <span>Invalid email ID may lead to deactivation of IRCTC account.</span>
          </div>

          <div className="form-row">
            <FormInput
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="Enter your email"
              required
              autoComplete="email"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="isd" className="form-label">
                Country Code (ISD)
              </label>
              <select
                id="isd"
                name="isd"
                value={form.isd}
                onChange={handleChange}
                className="form-select"
              >
                <option>+91 - India</option>
                <option>+1 - USA</option>
                <option>+44 - UK</option>
                <option>+61 - Australia</option>
                <option>+971 - UAE</option>
              </select>
            </div>
          </div>

          <div className="info-box">
            <span className="info-icon">ℹ️</span>
            <span>Please submit Mobile Number without ISD Code</span>
          </div>

          <div className="form-row">
            <FormInput
              label="Mobile Number"
              name="mobile"
              type="tel"
              value={form.mobile}
              onChange={handleChange}
              error={errors.mobile}
              placeholder="Enter 10-digit mobile number"
              required
              maxLength="10"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="captchaInput" className="form-label">
                Captcha: <strong className="captcha-question">{captcha.q}</strong>
              </label>
              <div className="captcha-wrapper">
                <input
                  id="captchaInput"
                  name="captchaInput"
                  type="text"
                  value={form.captchaInput}
                  onChange={handleChange}
                  placeholder="Enter answer"
                  className={`form-input ${errors.captchaInput ? 'input-error' : ''}`}
                  maxLength="3"
                />
                <button
                  type="button"
                  onClick={generateCaptcha}
                  className="captcha-refresh-btn"
                  aria-label="Refresh captcha"
                >
                  🔄 Refresh
                </button>
              </div>
              {errors.captchaInput && (
                <div className="error-message" role="alert">
                  {errors.captchaInput}
                </div>
              )}
            </div>
          </div>

          <FormButton
            type="submit"
            variant="primary"
            loading={isLoading}
            className="register-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </FormButton>

          <div className="login-link">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="login-link-btn">
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
