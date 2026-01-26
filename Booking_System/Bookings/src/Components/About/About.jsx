import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="about-section">
     {/* Footer section of Home page */}
        <div className="about-grid">
          {/* About MRC */} 
          <div className="about-card">
            <h3 >About MRC</h3>
            <p className="about-description">
             Maharashtra Railways Corporation provides safe, reliable, and efficient railway services, enhancing passenger convenience through modern infrastructure and digital solutions.
            </p>
          </div>

          {/* Our Services */} 
          <div className="about-card">
            <h3>Our Services</h3>
            <ul className="about-services-list">
              <li className="about-service-item">• Train Bookings</li>
              <li className="about-service-item">• PNR status checking</li>
              <li className="about-service-item">• Train schedule</li>
              <li className="about-service-item">• Seat availability</li>
              <li className="about-service-item">• Ticket cancellations</li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="about-card">
            <h3>Contact Us</h3>
            <div className="about-contact">
              <div className="about-contact-item">
          {/* Phone */}
                <span className="about-contact-icon">📞</span>
                <a href="tel:+911800111111" className="about-contact-link">+835601915</a>
              </div>
              <div className="about-contact-item">
          {/* Email */}
                <span className="about-contact-icon">✉</span>
                <a href="mailto:support@irctc.co.in" className="about-contact-link">support@irctc.co.in</a>
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