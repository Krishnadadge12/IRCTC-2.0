import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import './Navbar.css';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/home');
    setIsSidebarOpen(false);
  }; 

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
          <Link className='navbar-link' to={"/home/register"}>
          Register </Link>
          <Link className='navbar-link' to={"/home/search"}>Train Search</Link>
          <Link className='navbar-link' to={"/home/booking"}>Bookings</Link>
         
          <Link className='navbar-link' to={"/home/AboutUs"}>AboutUs</Link>
        </div>

        

        {/* Contact, Login/Logout & Hamburger */}
        <div className="navbar-actions">
          <button className="navbar-contact-btn">Contact Us</button>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="navbar-login-btn">
              Logout
            </button>
          ) : (
            <Link to="/home/login" className="navbar-login-btn">Login</Link>
          )}

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
                  {isAuthenticated ? (
                    <>
                      <li className="navbar-sidebar-item">
                        <span style={{ padding: '10px', color: '#4a90e2', fontWeight: 'bold' }}>
                          {user?.fullname || user?.username || 'User'}
                        </span>
                      </li>
                      <li className="navbar-sidebar-item">
                        <button onClick={handleLogout}>Logout</button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="navbar-sidebar-item"><Link to="/home/login" onClick={() => setIsSidebarOpen(false)}>Login</Link></li>
                      <li className="navbar-sidebar-item"><Link to="/home/register" onClick={() => setIsSidebarOpen(false)}>Register</Link></li>
                    </>
                  )}
                  <li className="navbar-sidebar-item"><Link to="/home/search" onClick={() => setIsSidebarOpen(false)}>Search Train</Link></li>
                  <li className="navbar-sidebar-item"><Link to="/home/booking" onClick={() => setIsSidebarOpen(false)}>Book Train</Link></li>
                  <li className="navbar-sidebar-item"><Link to="/home/cancel" onClick={() => setIsSidebarOpen(false)}>Cancel Train</Link></li>
                  <li className="navbar-sidebar-item"><Link to="/home/AboutUs" onClick={() => setIsSidebarOpen(false)}>About</Link></li>
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