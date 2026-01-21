import React from 'react';
import './Footer.css';
import About from '../About/About';

const Footer = () => {
  return (
    <footer className="footer">
      <div><About /></div>
      <div className="footer-container">
        <hr className="footer-divider" />

        <div className="footer-main">
          <div className="footer-copyright">
            <p id='copyright'>© {new Date().getFullYear()} Maharashtra Railway Corporation Ltd. All rights reserved.</p>
          </div>
        </div>

        <div className="footer-links-section">
          <div className="footer-links-grid">
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms &amp; Conditions</a>
            <a href="#" className="footer-link">Site Map</a>
            <a href="#" className="footer-link">FAQs</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
