import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="about-section">
     {/* Footer section of Home page */}
        <div className="about-grid">
          {/* Our Services */} 
          <div className="about-card">
            <h3>Future Goals</h3>
            <ul className="about-services-list">
              <li className="about-service-item">• Boarding Reminder Notifications</li>
              <li className="about-service-item">• Live Train Tracking</li>
              <li className="about-service-item">• Journey Planner</li>
              <li className="about-service-item">• Alternate Train Suggestions</li>
              <li className="about-service-item">• Delay / Cancellation Alerts</li>
              <li className="about-service-item">• Refund</li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="about-card">
            <h3>Contact Us</h3>
            <div className="about-contact">
              <div className="about-contact-item">
          {/* Phone */}
                <span className="about-contact-icon">📞</span>
                <a href="tel:+911800111111" className="about-contact-link">+8349405471</a>
              </div>
              <div className="about-contact-item">
          {/* Email */}
                <span className="about-contact-icon">✉</span>
                <a href="mailto:support@irctc.co.in" className="about-contact-link">support@mrc.co.in</a>
              </div>
              <div className="about-contact-item-start">
          {/* Location */}
                <span className="about-contact-icon about-contact-icon-mt">📍</span>
                <span className="about-contact-text">Pune, India</span>
              </div>
            </div>
          </div>
        
      </div>
    </section>
  );
};

export default About;