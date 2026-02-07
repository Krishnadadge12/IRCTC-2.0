import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Features.css';

const Features = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  return (
    <div className="hero-container">

  {/* IMAGE SECTION */}
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
      <h1 className="hero-title">Journey to Discover Maharashtra</h1>
      <p className="hero-subtitle">
        Book your travel with MRC - Your Journey, Just a Tap Away
      </p>
    </div>

  </div>

      {/* Images Section */}
      <div className="hero-features-section">
        <div className="hero-features-container">
          <h2 className="hero-features-title">Our Features</h2>
          <div className="hero-features-grid">
            <div 
              className="hero-feature-card"
              onClick={() => navigate('/home/pnr-status')}
              style={{ cursor: 'pointer' }}
            >
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

            <div 
              className="hero-feature-card"
              onClick={() => {
                if (isAuthenticated) {
                  navigate('/home/my-bookings');
                } else {
                  navigate('/home/login');
                }
              }}
              style={{ cursor: 'pointer' }}
            >
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

            <div 
              className="hero-feature-card"
              onClick={() => {
                if (isAuthenticated) {
                  navigate('/home/booking');
                } else {
                  navigate('/home/login');
                }
              }}
              style={{ cursor: 'pointer' }}
            >
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

export default Features;