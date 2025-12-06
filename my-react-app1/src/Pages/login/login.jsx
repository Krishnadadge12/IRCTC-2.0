import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { validateUsername, validateRequired } from '../../utils/validation';
import FormInput from '../../Components/FormInput';
import FormButton from '../../Components/FormButton';
import './login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

    // Validate password
    const passwordValidation = validateRequired(form.password, 'Password');
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.message;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u) => u.username === form.username.trim());

      if (!user) {
        toast.error('User not found. Please register first.');
        setErrors({ username: 'User not found. Please register first.' });
        setIsLoading(false);
        return;
      }

      if (user.password !== form.password) {
        toast.error('Incorrect password. Please try again.');
        setErrors({ password: 'Incorrect password.' });
        setIsLoading(false);
        return;
      }

      // Login successful
      login(user);
      toast.success(`Welcome back, ${user.fullname || user.username}!`);
      
      // Navigate to home after a short delay
      setTimeout(() => {
        navigate('/home');
      }, 500);
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h2>Login</h2>
          <p className="login-subtitle">Welcome back! Please login to your account.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="login-form">
          <FormInput
            label="Username"
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
            error={errors.username}
            placeholder="Enter your username"
            required
            autoComplete="username"
          />

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password <span className="form-input-required">*</span>
            </label>
            <div className="password-input-wrapper">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`form-input ${errors.password ? 'input-error' : ''}`}
                autoComplete="current-password"
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

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="forgot-password-link">
              Forgot Password?
            </Link>
          </div>

          <FormButton
            type="submit"
            variant="primary"
            loading={isLoading}
            className="login-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </FormButton>

          <div className="register-link">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="register-link-btn">
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
