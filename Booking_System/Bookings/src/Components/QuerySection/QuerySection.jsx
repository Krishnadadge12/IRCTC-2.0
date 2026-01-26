import React, { useState } from 'react';
import './QuerySection.css';

// QuerySection component for user support / contact queries
const QuerySection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    origin: '',
    query: ''
  });

  // Handles input value changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you can add API call to submit the form
    alert('Thank you! Your query has been submitted. We will contact you soon.');
    setFormData({ name: '', email: '', phone: '', origin: '', query: '' });
  };

  return (
    <section className="query-section">
      <div className="query-container">
        <div className="query-box">
          <h2 className="query-title">YOUR QUERY</h2>
          <p className="query-subtitle">Just put your name and details, and we'll get back to you within 24 hours!</p>

          <form onSubmit={handleSubmit} className="query-form">
            <div className="query-form-grid">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="query-input"
                />
              </div>

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

            <div className="query-form-grid">
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="query-input"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="origin"
                  placeholder="Place Of Origin"
                  value={formData.origin}
                  onChange={handleChange}
                  className="query-input"
                />
              </div>
            </div>

            <div>
              <textarea
                name="query"
                placeholder="Type Your Query"
                value={formData.query}
                onChange={handleChange}
                required
                rows="5"
                className="query-textarea"
              ></textarea>
            </div>

            <div className="query-submit-container">
              <button
                type="submit"
                className="query-submit-btn"
              >
                Send Now 📨
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default QuerySection;
