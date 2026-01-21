import React from "react";
import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="about-bg">
      <div className="about-overlay"></div>

      <div className="about-container">
        <h1 className="about-title">About Us</h1>

        <p className="about-intro">
          Maharashtra Railways Corporation Limited (MRCL) is a joint venture
          company established to enhance rail-based transportation
          infrastructure across the state of Maharashtra.
        </p>

        <section className="about-section">
          <h3>Who We Are</h3>
          <p>
            Maharashtra Railways Corporation Limited was formed with the vision
            of developing modern, efficient, and passenger-friendly railway
            systems. The corporation works in collaboration with Indian
            Railways and the Government of Maharashtra to plan, execute, and
            manage rail projects that improve regional and suburban
            connectivity.
          </p>
        </section>

        <section className="about-section">
          <h3>Our Mission</h3>
          <ul>
            <li>To provide safe, reliable, and efficient rail services</li>
            <li>To modernize railway infrastructure using digital technologies</li>
            <li>To improve passenger convenience and accessibility</li>
            <li>To support sustainable and eco-friendly transportation</li>
          </ul>
        </section>

        <section className="about-section">
          <h3>What We Offer</h3>
          <p>
            Through this Railway Ticket Booking System, passengers can easily:
          </p>
          <ul>
            <li>Search and book train tickets online</li>
            <li>Manage passenger details securely</li>
            <li>Review journey and fare details</li>
            <li>Experience a transparent and user-friendly booking process</li>
          </ul>
        </section>

        <section className="about-section">
          <h3>Our Vision</h3>
          <p>
            To become a leading rail infrastructure organization by adopting
            advanced technologies and delivering world-class railway services
            that meet the growing transportation needs of Maharashtra.
          </p>
        </section>

        <section className="about-section">
          <h3>Commitment to Passengers</h3>
          <p>
            Passenger safety, data security, and service reliability remain our
            top priorities. We continuously strive to improve our systems and
            services to ensure a seamless travel experience for every commuter.
          </p>
        </section>
      </div>
    </div>
  );
}

export default AboutUs;
