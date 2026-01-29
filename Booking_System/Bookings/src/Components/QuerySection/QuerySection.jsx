import React, { useState } from 'react';
import './QuerySection.css';

// QuerySection component for user support / contact queries
const QuerySection = () => {
  const [formData, setFormData] = useState({
    email: '',
    query: ''
  });
  const [error, setError] = useState('');
  const MAX_QUERY_LENGTH = 399;
  const remaining = MAX_QUERY_LENGTH - formData.query.length;

  // Handles input value changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    let val = value;
    if (name === 'query' && val.length > MAX_QUERY_LENGTH) {
      val = val.slice(0, MAX_QUERY_LENGTH);
    }
    setFormData(prevState => ({
      ...prevState,
      [name]: val
    }));
    if (error) setError('');
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!formData.email || !formData.query) {
      setError('Please fill in both email and query.');
      return;
    }
    if (formData.query.length > MAX_QUERY_LENGTH) {
      setError(`Query cannot exceed ${MAX_QUERY_LENGTH} characters.`);
      return;
    }

    console.log('Form submitted:', formData);
    // Here you can add API call to submit the form
    alert('Thank you! Your query has been submitted. We will get back to you via email.');
    setFormData({ email: '', query: '' });
  };

  return (
    <section className="query-section">
      <div className="query-container">
        <div className="query-box">
          <h2 className="query-title">YOUR QUERY</h2>

          <form onSubmit={handleSubmit} className="query-form">
            <div className="query-form-grid">
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="query-input"
                />
              </div>
            </div>

            <div>
              <textarea
                name="query"
                placeholder="Type Your Query (max 399 chars)"
                value={formData.query}
                onChange={handleChange}
                required
                rows="5"
                className="query-textarea"
                maxLength={MAX_QUERY_LENGTH}
              ></textarea>

              <div className={`query-char-count ${remaining <= 40 ? 'warning' : ''}`}>
                {remaining} characters remaining
              </div>

              {error && <div className="query-error">{error}</div>}
            </div>

            <div className="query-submit-container">
              <button
                type="submit"
                className="query-submit-btn"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default QuerySection;
