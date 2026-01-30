import React, { useState } from "react";
import "./TCHome.css";
import { getPassengersByTrain, updateBookingStatus, cancelBookingByPassenger } from "../../services/tcService";

const TCHome = () => {
  const [trainId, setTrainId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passengers, setPassengers] = useState([]);
  const [updatingBooking, setUpdatingBooking] = useState(null);

  const handleFetch = async (e) => {
    e.preventDefault();
    setError("");
    setPassengers([]);

    const trimmed = trainId && trainId.toString().trim();
    if (!trimmed) {
      setError("Please enter a valid Train ID.");
      return;
    }

    try {
      setLoading(true);
      const data = await getPassengersByTrain(trimmed);
      // Map TcPassengerResponseDto to UI-friendly fields
      const mapped = (Array.isArray(data) ? data : []).map((p) => ({
        id: p.passengerId || p.id || p._id,
        name: p.name || "-",
        age: p.age != null ? p.age : "-",
        gender: p.gender || "-",
        coachNo: p.coachNo || "-",
        seatNo: p.seatNo || "-",
        seatLabel: p.seatLabel || "-",
        bookingId: p.bookingId || (p.booking && (p.booking.id || p.booking.bookingId)) || null,
        status: p.bookingStatus || p.status || (p.booking && p.booking.status) || "CONFIRMED",
        pnr: p.pnr || "-"
      }));

      setPassengers(mapped);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Unable to fetch passengers. Check backend or Train ID.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId, passengerId, pnr, newStatus) => {
    if (!bookingId && !passengerId && !pnr) {
      setError("Missing booking identifier (bookingId or PNR or passengerId) for this passenger.");
      return;
    }

    const previous = [...passengers];
    setPassengers(previous.map(p => (p.bookingId === bookingId || p.id === passengerId || p.pnr === pnr) ? { ...p, status: newStatus } : p));

    // If user chose CANCELLED, use passengerId-based cancel endpoint (server will handle seat freeing/promotion)
    const identifier = passengerId || bookingId || pnr;
    setUpdatingBooking(identifier);
    try {
      if (newStatus === 'CANCELLED') {
        // Prefer cancel by passenger id if available
        if (passengerId) {
          await cancelBookingByPassenger(passengerId);
        } else if (bookingId) {
          // fallback to bookingId cancel endpoint
          await updateBookingStatus(bookingId, 'CANCELLED');
        } else {
          // try pnr fallback
          await updateBookingStatus(pnr, 'CANCELLED');
        }
      } else {
        // For other statuses, try normal update (requires backend support)
        const ident = bookingId || pnr;
        await updateBookingStatus(ident, newStatus);
      }

      setError("");
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Unable to update booking status.");
      setPassengers(previous);
    } finally {
      setUpdatingBooking(null);
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
            <h3>Fetch passengers by Train ID</h3>

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
                {loading ? 'Loading...' : 'Fetch Passengers'}
              </button>
            </form>

            {error && <div className="tc-error">{error}</div>}

          </div>
        </div>
        <p color="red">Once status is cancelled , it cannot be changed again.</p>
        <div className="tc-results">
          {passengers.length > 0 ? (
            <table className="tc-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Coach</th>
                  <th>Seat No</th>
                  <th>Seat Label</th>
                  <th>PNR</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {passengers.map((p) => (
                  <tr key={p.id || p.pnr || Math.random()}>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td>{p.age}</td>
                    <td>{p.gender}</td>
                    <td>{p.coachNo}</td>
                    <td>{p.seatNo}</td>
                    <td>{p.seatLabel}</td>
                    <td>{p.pnr}</td>
                    <td>
                      {p.status === 'CANCELLED' ? (
                        <span className="tc-cancelled">CANCELLED</span>
                      ) : (
                        <select
                          value={p.status || 'CONFIRMED'}
                          onChange={(e) => handleStatusChange(p.bookingId, p.id, p.pnr, e.target.value)}
                          disabled={updatingBooking === (p.bookingId || p.id || p.pnr)}
                        >
                          <option value="CONFIRMED" disabled>CONFIRMED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="tc-empty">No passengers to display.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TCHome;
