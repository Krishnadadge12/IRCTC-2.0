import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Bookings.css";

// Landing page for admin bookings — enter a Train ID to view bookings
function BookingsLanding() {
  const [trainId, setTrainId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = trainId && trainId.toString().trim();
    if (!trimmed) {
      setError("Please enter a valid Train ID.");
      return;
    }
    setError("");
    navigate(`/admin/bookings/${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="container">
      <div className="content">
        <div className="card">
          <h3>Bookings</h3>
          <p>Enter a Train ID to view its bookings.</p>

          <form onSubmit={handleSubmit} className="tc-card-form" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              id="landingTrainId"
              type="text"
              value={trainId}
              onChange={(e) => setTrainId(e.target.value)}
              placeholder="Enter Train ID e.g. 12345"
              className="tc-input"
              style={{ flex: 1 }}
            />
            <button type="submit" className="admin-link">View</button>
          </form>

          {error && <div className="tc-error" style={{ marginTop: 8 }}>{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default BookingsLanding;
