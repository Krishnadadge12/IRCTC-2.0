import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AdminHome.css";
import { useNavigate } from 'react-router-dom';

function AdminHome() {
  const [showModal, setShowModal] = useState(false);
  const [trainId, setTrainId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const navigate = useNavigate();

  const openModal = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setError("");
    setTrainId("");
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  const handleFetch = (ev) => {
    ev.preventDefault();
    setError("");

    const trimmed = trainId && trainId.toString().trim();
    if (!trimmed) {
      setError("Please enter a valid Train ID.");
      return;
    }

    // navigate to bookings page for train (TrainBookings page will fetch data)
    setShowModal(false);
    setTrainId("");
    navigate(`/admin/bookings/${encodeURIComponent(trimmed)}`);
  };

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

          <Link to="/admin/bookings" className="admin-link" onClick={openModal}>
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

        {/* Modal for entering Train ID */}
        {showModal && (
          <div className="tc-modal-overlay">
            <div className="tc-modal-card">
              <button className="modal-close" onClick={closeModal}>✕</button>
              <h3>Fetch bookings by Train ID</h3>

              <form onSubmit={handleFetch} className="tc-card-form">
                <input
                  id="adminTrainId"
                  type="text"
                  value={trainId}
                  onChange={(e) => setTrainId(e.target.value)}
                  placeholder="Enter Train ID e.g. 12345"
                  className="tc-input"
                />
                <button type="submit" className="admin-link" disabled={loading}>{loading ? 'Loading...' : 'Fetch'}</button>
              </form>

              {error && <div className="tc-error">{error}</div>}
            </div>
          </div>
        )}



      </div>
    </div>
  );
}

export default AdminHome;
