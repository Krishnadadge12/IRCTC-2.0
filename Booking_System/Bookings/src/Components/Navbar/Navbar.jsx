import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Link for navigation, useNavigate for programmatic navigation
import { useAuth } from '../../context/AuthContext'; // Custom hook to access authentication state
import { toast } from 'react-toastify'; // For showing toast notifications
import './Navbar.css';

const Navbar = () => {
  // isSidebarOpen manages mobile menu visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Get authentication state (isAuthenticated, user info, logout function) from context
  const { isAuthenticated, user, logout } = useAuth();
  // useNavigate hook for programmatic navigation after logout
  const navigate = useNavigate();

  // Handle logout: clears user session, shows toast, navigates to home, closes sidebar
  const handleLogout = () => {
    logout(); // Remove user from session/localStorage
    toast.success('Logged out successfully'); // Show success notification
    navigate('/home'); // Redirect to home page
    setIsSidebarOpen(false); // Close mobile menu if open
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
          {/* Register link - shown only when user is NOT logged in */}
          {!isAuthenticated && (
            <Link className='navbar-link' to={"/home/register"}>
              •Register•
            </Link>
          )}
          {/* Train Search link - shown for all users (logged in or not) */}
          <Link className='navbar-link' to={"/home/search"}>•Train Search•</Link>
          {/* Book Ticket link - shown for all users */}
          <Link className='navbar-link' to={"/home/booking"}>•Book Ticket•</Link>
          {/* My Bookings link - shown only when user is logged in */}
          {isAuthenticated && (
            <Link className='navbar-link' to={"/home/my-bookings"}>•My Bookings•</Link>
          )}
          {/* About Us link - shown for all users */}
          <Link className='navbar-link' to={"/home/AboutUs"}>•About Us•</Link>
        </div>

        

        {/* Contact, Login/Logout & Hamburger */}
        <div className="navbar-actions">
          {/* Contact Us button */}
          <button className="navbar-contact-btn">Contact Us</button>
          {/* Show Logout button if user is logged in, otherwise show Login link */}
          {isAuthenticated ? (
            <button onClick={handleLogout} className="navbar-login-btn">
              Logout
            </button>
          ) : (
            <Link to="/home/login" className="navbar-login-btn">Login</Link>
          )}

          {/* Mobile hamburger menu button - toggles sidebar visibility */}
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
                  {/* Show user info and logout button if authenticated */}
                  {isAuthenticated ? (
                    <>
                      <li className="navbar-sidebar-item">
                        {/* Display user's name from auth context */}
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
                      {/* Show login and register links if not authenticated */}
                      <li className="navbar-sidebar-item"><Link to="/home/login" onClick={() => setIsSidebarOpen(false)}>Login</Link></li>
                      <li className="navbar-sidebar-item"><Link to="/home/register" onClick={() => setIsSidebarOpen(false)}>Register</Link></li>
                    </>
                  )}
                  {/* Search Train link - available to all users */}
                  <li className="navbar-sidebar-item"><Link to="/home/search" onClick={() => setIsSidebarOpen(false)}>Search Train</Link></li>
                  {/* Book Train link - available to all users */}
                  <li className="navbar-sidebar-item"><Link to="/home/booking" onClick={() => setIsSidebarOpen(false)}>Book Train</Link></li>
                  {/* My Bookings link - shown only when user is logged in */}
                  {isAuthenticated && (
                    <li className="navbar-sidebar-item"><Link to="/home/my-bookings" onClick={() => setIsSidebarOpen(false)}>My Bookings</Link></li>
                  )}
                  {/* Cancel Train link - available to all users */}
                  <li className="navbar-sidebar-item"><Link to="/home/cancel" onClick={() => setIsSidebarOpen(false)}>Cancel Train</Link></li>
                  {/* About Us link - available to all users */}
                  <li className="navbar-sidebar-item"><Link to="/home/AboutUs" onClick={() => setIsSidebarOpen(false)}>About</Link></li>
                  {/* Contact Us button */}
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