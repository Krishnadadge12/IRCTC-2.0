import React from "react";
import { Link } from "react-router-dom";
import "./AdminHome.css";

function AdminHome() {
  return (
    <div className="container">
        
    <div className="admin-home">
 <div className="navbar-logo-section">
              
            <div className='navbar-logo-link' to={'/home'}>
             <img 
                src="/images/MRC.png"
                alt="MRC Logo" 
                className="navbar-logo-img"
              />
               </div>
              
            </div>
      <h1>Admin Dashboard</h1>

      <div className="links-container">

        <Link to="/admin/bookings" className="admin-link">
           Bookings
        </Link>

        <Link to="/admin/trains" className="admin-link">
           Train Details
        </Link>

        <Link to="/admin/queries" className="admin-link">
           Queries
        </Link>

        <Link to="/admin/users" className="admin-link">
           Users
        </Link>

      </div>

    </div>
    </div>
  );
}

export default AdminHome;
