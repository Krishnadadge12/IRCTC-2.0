import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { config } from "../../services/config";
import "./AdminHome.css";

function AdminHome() {
  const [showModal, setShowModal] = useState(false);
  const [trainId, setTrainId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState([]);

  const openModal = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setError("");
    setTrainId("");
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  const handleFetch = async (ev) => {
    ev.preventDefault();
    setError("");
    setBookings([]);

    const trimmed = trainId && trainId.toString().trim();
    if (!trimmed) {
      setError("Please enter a valid Train ID.");
      return;
    }

    try {
      setLoading(true);
      const url = `${config.server}/api/bookings/train/${encodeURIComponent(trimmed)}`;
      const res = await axios.get(url);
      setBookings(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Unable to fetch bookings. Check backend or Train ID.");
    } finally {
      setLoading(false);
    }
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

        {/* Results table shown below links when bookings present */}
        {bookings && bookings.length > 0 && (
          <div className="bookings-results">
            <h3>Bookings for Train: {trainId}</h3>
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>PNR</th>
                  <th>Passengers</th>
                  <th>Status</th>
                  <th>Journey Date</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id || b.id || b.pnrNumber || Math.random()}>
                    <td>{b.id || b.bookingId || b._id || '-'}</td>
                    <td>{b.pnrNumber || '-'}</td>
                    <td>{b.passengers ? b.passengers.length : b.totalPassengers || 0}</td>
                    <td>{b.status || '-'}</td>
                    <td>{b.departureDate || b.bookingDate || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}

export default AdminHome;
