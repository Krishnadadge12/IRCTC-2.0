import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  validateEmail,
  validatePassword,
  validateMobile,
  validateFullName,
} from '../../utils/validation';
import FormInput from '../../Components/Form/FormInput';
import FormButton from '../../Components/Form/FormButton';
import './register.css';

const Registration = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: 'NOT_SPECIFIED',
    idProof: 'AADHAR',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!validateFullName(form.firstName).isValid)
      newErrors.firstName = 'First name is required';

    if (!validateFullName(form.lastName).isValid)
      newErrors.lastName = 'Last name is required';

    if (!form.dob)
      newErrors.dob = 'Date of birth is required';

    if (!validateEmail(form.email))
      newErrors.email = 'Invalid email address';

    const mobileValidation = validateMobile(form.phone);
    if (!mobileValidation.isValid)
      newErrors.phone = mobileValidation.message;

    const passwordValidation = validatePassword(form.password);
    if (!passwordValidation.isValid)
      newErrors.password = passwordValidation.message;

    if (form.confirmPassword !== form.password)
      newErrors.confirmPassword = 'Passwords do not match';

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
      const response = await fetch('http://localhost:8080/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const err = await response.text();
        throw new Error(err);
      }

      toast.success('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/home/login'), 1500);

    } catch (err) {
      toast.error(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">

        {/* ✅ CENTERED HEADER */}
        <div className="register-header">
          <h2>Create Account</h2>
          <p className="register-subtitle">
            Join us today! Fill in your details to get started.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="register-form" noValidate>

          <FormInput
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            error={errors.firstName}
            required
          />

          <FormInput
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            error={errors.lastName}
            required
          />

          <FormInput
            label="Date of Birth"
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            error={errors.dob}
            required
          />

          <div className="form-group">
            <label className="form-label">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="form-input"
            >
              <option value="NOT_SPECIFIED">Not Specified</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">ID Proof</label>
            <select
              name="idProof"
              value={form.idProof}
              onChange={handleChange}
              className="form-input"
            >
              <option value="AADHAR">Aadhar</option>
              <option value="PAN">PAN</option>
              <option value="DRIVING_LICENSE">Driving License</option>
            </select>
          </div>

          <FormInput
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            required
          />

          <FormInput
            label="Mobile Number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            error={errors.phone}
            required
            maxLength="10"
          />

          <FormInput
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            required
          />

          <FormInput
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            required
          />

          {/* ✅ FIXED SUBMIT BUTTON */}
          <FormButton
            type="submit"
            variant="primary"
            loading={isLoading}
            disabled={isLoading}
            className="register-submit-btn"
          >
            {isLoading ? 'Registering...' : 'Register'}
          </FormButton>

          <div className="login-link">
            <p>
              Already have an account?{' '}
              <Link to="/home/login" className="login-link-btn">
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
