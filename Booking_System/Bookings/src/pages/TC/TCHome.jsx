import React, { useState } from "react";
import axios from "axios";
import { config } from "../../services/config";
import "./TCHome.css";

const TCHome = () => {
  const [trainId, setTrainId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState([]);

  const handleFetch = async (e) => {
    e.preventDefault();
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
      // Expecting an array of bookings
      setBookings(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message || "Unable to fetch bookings. Check backend or Train ID."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="tc-home">
        <div className="navbar-logo-section">
          <div className="navbar-logo-link" to={'/home'}>
            <img src="/images/MRC.png" alt="MRC Logo" className="navbar-logo-img" />
          </div>
        </div>

        <h1>TC Dashboard</h1>

        <div className="links-container single-card">
          <div className="tc-card">
            <h3>Fetch bookings by Train ID</h3>

            <form onSubmit={handleFetch} className="tc-card-form">
              <input
                id="trainId"
                type="text"
                value={trainId}
                onChange={(e) => setTrainId(e.target.value)}
                placeholder="Enter Train ID e.g. 12345"
                className="tc-input"
                />
              <button type="submit" className="admin-link" disabled={loading}>
                {loading ? 'Loading...' : 'Fetch Bookings'}
              </button>
            </form>

            {error && <div className="tc-error">{error}</div>}

          </div>
        </div>

        <div className="tc-results">
          {bookings.length > 0 ? (
            <table className="tc-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>PNR</th>
                  <th>Passenger Count</th>
                  <th>Status</th>
                  <th>Journey Date</th>
                  <th>Passengers</th>
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
                    <td>
                      {b.passengers && b.passengers.length > 0 ? (
                        <ul className="pass-list">
                          {b.passengers.map((p, idx) => (
                            <li key={idx}>{`${p.name || p.fullName || 'Passenger'} (${p.seat || p.coach || ''})`}</li>
                          ))}
                        </ul>
                      ) : (
                        <em>No passenger data</em>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="tc-empty">No bookings to display.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TCHome;
