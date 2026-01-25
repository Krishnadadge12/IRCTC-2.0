import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Login navigation handled by Link component 

  return (
    <nav className="navbar">
  <div className="navbar-container">

    <div className="navbar-logo-section">
      
    <Link className='navbar-logo-link' to={'/home'}>
     <img 
        src="/images/MRC.png"
        alt="MRC Logo" 
        className="navbar-logo-img"
      />
      <span className="navbar-logo-text"></span>
       </Link>
      
    </div>

        {/* Menu Items */}
        <div className="navbar-menu">
          <Link className='navbar-link' to={"/register"}>
          Register </Link>
          <Link className='navbar-link' to={"/search"}>Train Search</Link>
          <Link className='navbar-link' to={"/booking"}>Bookings</Link>
         
          <Link className='navbar-link' to={"/AboutUs"}>AboutUs</Link>
        </div>

        

        {/* Contact, Login & Hamburger */}
        <div className="navbar-actions">
          <button className="navbar-contact-btn">Contact Us</button>
          <Link to="/login" className="navbar-login-btn">Login</Link>

          {/* small three-line hamburger, placed right of Login */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open menu"
            className="navbar-hamburger"
          >
            <span className="navbar-hamburger-line navbar-hamburger-line-1"></span>
            <span className="navbar-hamburger-line navbar-hamburger-line-2"></span>
            <span className="navbar-hamburger-line navbar-hamburger-line-3"></span>
          </button>
        </div>

        {/* Sidebar overlay (right) */}
        {isSidebarOpen && (
          <>
            <div
              className="navbar-sidebar-overlay"
              onClick={() => setIsSidebarOpen(false)}
            />

            <aside className="navbar-sidebar">
              <div className="navbar-sidebar-header">
                <button
                  aria-label="Close menu"
                  onClick={() => setIsSidebarOpen(false)}
                  className="navbar-sidebar-close"
                >
                  ✕
                </button>
              </div>

              <nav className="navbar-sidebar-nav">
                <ul className="navbar-sidebar-list">
                  <li className="navbar-sidebar-item"><Link to="/login">Login</Link></li>
                  <li className="navbar-sidebar-item"><Link to="/register">Register</Link></li>
                  <li className="navbar-sidebar-item"><Link to="/search">Search Train</Link></li>
                  <li className="navbar-sidebar-item"><Link to="/booking">Book Train</Link></li>
                  <li className="navbar-sidebar-item"><Link to="/cancel">Cancel Train</Link></li>
                  <li className="navbar-sidebar-item"><Link to="/AboutUs">About</Link></li>
                  <li className="navbar-sidebar-item"><button onClick={() => setIsSidebarOpen(false)}>Contact Us</button></li>
                </ul>

                <div className="navbar-sidebar-footer">
                  <div className="navbar-sidebar-contact">
                    <span className="navbar-sidebar-contact-icon">✉</span>
                    <span>support@irctc2.com</span>
                  </div>
                  <div className="navbar-sidebar-contact">
                    <span className="navbar-sidebar-contact-icon">☎</span>
                    <span>8956049195</span>
                  </div>
                </div>
              </nav>
            </aside>
          </>
        )}
  </div>
    </nav>
  );
};

export default Navbar;