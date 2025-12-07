import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  return (
    <div className="hero-container">

  {/* HERO IMAGE SECTION */}
  <div
    className="hero-image-section"
    style={{
      backgroundImage: "url(/images/background_img.jpeg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    {/* Dark Overlay */}
    <div className="hero-overlay"></div>

    {/* Hero Text Content */}
    <div className="hero-content">
      <h1 className="hero-title">Journey to Discover India</h1>
      <p className="hero-subtitle">
        Book your travel with IRCTC - Your Journey, Just a Tap Away
      </p>
    </div>

    {/* Search Box - Positioned inside the Hero image */}
    <div className="hero-search-container">
      <div className="hero-search-box">
        <div className="hero-search-form">

          {/* Origin Input */}
          <div className="hero-search-field">
            <label className="hero-search-label">
              Origin City
            </label>
            <input
              type="text"
              placeholder="Enter Origin City"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="hero-search-input"
            />
          </div>

          {/* Destination Input */}
          <div className="hero-search-field">
            <label className="hero-search-label">
              Destination City
            </label>
            <input
              type="text"
              placeholder="Enter Destination City"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="hero-search-input"
            />
          </div>

          {/* Search Button */}
          <button onClick={() => navigate('/search')} className="hero-search-btn">
            Search
          </button>

        </div>
      </div>
    </div>
  </div>

      {/* Images Section */}
      <div className="hero-features-section">
        <div className="hero-features-container">
          <h2 className="hero-features-title">Our Features</h2>
          <div className="hero-features-grid">
            <div className="hero-feature-card">
              <img
                src="/images/checkPnr.jpeg"
                alt="Hotel Offer"
                className="hero-feature-img"
              />
              <div className="hero-feature-content">
                <h3 className="hero-feature-title">PNR status checking</h3>
                <p className="hero-feature-description">Check real-time PNR status, seat confirmation chances, and updates</p>
              </div>
            </div>

            <div className="hero-feature-card">
              <img
                src="/images/tatkal_img.jpeg"
                alt="Bus Tickets"
                className="hero-feature-img"
              />
              <div className="hero-feature-content">
                <h3 className="hero-feature-title">Train Ticket Cancellation</h3>
                <p className="hero-feature-description">Cancel your train tickets easily and receive instant refund and status updates.</p>
              </div>
            </div>

            <div className="hero-feature-card">
              <img
                src="/images/cancel.jpeg"
                alt="Bharat Gaurav"
                className="hero-feature-img"
              />
              <div className="hero-feature-content">
                <h3 className="hero-feature-title">Tatkal Ticket Booking</h3>
                <p className="hero-feature-description">Fast and secured Tatkal booking for emergency travel.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
