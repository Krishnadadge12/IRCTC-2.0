import React from 'react';
import './Footer.css';
import About from '../About/About';


// Footer component displayed at the bottom of all pages
const Footer = () => {
  return (
    <footer className="footer">
       {/* About section inside footer */}
      <div><About /></div>
      {/* Footer content container */}
      <div className="footer-container">
        {/* Divider line */}
        <hr className="footer-divider" />

         {/* Copyright section */} 
        <div className="footer-main">+

          <div className="footer-copyright">
            <p id='copyright'>© {new Date().getFullYear()} Maharashtra Railway Corporation Ltd. All rights reserved.</p>
          </div>
        </div>
          {/* Footer navigation links */}
        <div className="footer-links-section">
          <div className="footer-links-grid">
            {/* Footer links */}
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
