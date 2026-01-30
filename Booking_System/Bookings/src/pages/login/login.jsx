import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { validateEmail, validateRequired } from '../../utils/validation';
import FormInput from '../../Components/Form/FormInput';
import FormButton from '../../Components/Form/FormButton';
import {jwtDecode} from 'jwt-decode';

import './login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    username: '',   // using username key but it stores EMAIL
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

 const validateForm = () => {
  const newErrors = {};

  //  Email validation (correct for your utils)
  if (!validateEmail(form.username)) {
    newErrors.username = 'Please enter a valid email address.';
  }

  // Password validation
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
      const response = await fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.username,   //  backend expects email
          password: form.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();

    const decoded = jwtDecode(data.jwt);

console.log("DECODED JWT =>", decoded);



     console.log("LOGIN RESPONSE =>", data);

login({
  email: form.username,
  token: data.jwt,
  role: decoded.role, //  extracted from JWT
});

      toast.success('Login successful!');

// Spring sends ROLE_ADMIN / ROLE_PASSENGERS / ROLE_TC
const role = decoded.role;

let redirectPath = '/home';

if (role.includes('ADMIN')) {
  redirectPath = '/admin/home';
} else if (role.includes('TC')) {
  redirectPath = '/tc';
}

navigate(redirectPath);


    } catch (error) {
      toast.error('Invalid email or password');
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <div className="login-header">
          <h2>Login</h2>
          <p className="login-subtitle">
            Welcome back! Please login to your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="login-form">

          {/* ✅ EMAIL INPUT */}
          <FormInput
            label="Email"
            name="username"
            type="email"
            value={form.username}
            onChange={handleChange}
            error={errors.username}
            placeholder="Enter your email"
            required
            autoComplete="email"
          />

          {/* PASSWORD */}
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
              <Link to="/home/register" className="register-link-btn">
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
