import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBookingsByTrain, cancelBooking, updateBookingStatus } from "../../services/adminBooking";
import "./AdminHome.css";

function TrainBookings() {
  const { trainId } = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Allowed booking statuses
  const STATUSES = ["CONFIRMED", "CANCELLED"];
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    if (!trainId) return;
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trainId]);

  async function fetchBookings() {
    setLoading(true);
    setError("");
    try {
      const data = await getBookingsByTrain(trainId);
      const mapped = data.map((b) => ({
        id: b.bookingId || b.id || b._id,
        pnr: b.pnr || "-",
        status: (b.status || b.bookingStatus || "").toString(),
        journeyDate: b.journeyDate || b.departureDate || b.bookingDate,
        quota: b.quota || "-",
        coach: b.coachNo || b.coach || "-",
        seat: b.seatLabel || b.seat || b.seatNo || "-",
        price: b.fareAmount != null ? b.fareAmount : (b.price || b.totalFare || b.fare || null),
        passengers: b.passengerCount != null ? b.passengerCount : (b.passengers || 0),
        userEmail: b.userEmail || b.user || b.email || "-"
      }));
      setBookings(mapped);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Unable to fetch bookings for this train.");
    } finally {
      setLoading(false);
    }
  }

  const handleStatusChange = async (id, newStatus) => {
    // capture prev status for rollback
    let prevStatus;
    setBookings((prev) => prev.map((b) => {
      if (b.id === id) { prevStatus = b.status; return { ...b, status: newStatus }; }
      return b;
    }));

    setUpdatingId(id);
    try {
      // Always call the generic status update so admin can set any status (including reverting from CANCELLED)
      const updated = await updateBookingStatus(id, newStatus);

      const updatedStatus = updated?.status || updated?.bookingStatus || newStatus;
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: updatedStatus } : b)));
    } catch (err) {
      console.error(err);
      // rollback only targeted booking
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: prevStatus } : b)));
      alert(err?.response?.data?.message || err.message || 'Unable to update booking status');
    } finally {
      setUpdatingId(null);
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

        <h1>Bookings for Train: {trainId}</h1>
        <div style={{ marginBottom: 10 }}>
          <Link to="/admin/home" className="admin-link">← Back to Admin Home</Link>
        </div>

        {loading && <p>Loading bookings...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {bookings && bookings.length > 0 && (
          <div className="bookings-results">
            <p style={{ color: 'red', textAlign: 'center' }}>Once status is set, it cannot be changed back to CONFIRMED.</p>
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>PNR</th>
                  <th>Journey Date</th>
                  <th>Quota</th>
                  <th>Coach</th>
                  <th>Seat</th>
                  <th>Price</th>
                  <th>Passengers</th>
                  <th>User Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id || b.pnr || Math.random()}>
                    <td>{b.id || '-'}</td>
                    <td>{b.pnr || '-'}</td>
                    <td>{b.journeyDate ? new Date(b.journeyDate).toLocaleDateString() : '-'}</td>
                    <td>{b.quota || '-'}</td>
                    <td>{b.coach || '-'}</td>
                    <td>{b.seat || '-'}</td>
                    <td>{b.price != null ? b.price : '-'}</td>
                    <td>{Array.isArray(b.passengers) ? b.passengers.length : b.passengers}</td>
                    <td>{b.userEmail || '-'}</td>
                    <td>
                      <select
                        value={b.status}
                        disabled={updatingId === b.id}
                        onChange={(e) => handleStatusChange(b.id, e.target.value)}
                      >
                        {/* Ensure current status remains selectable */}
                        {!STATUSES.includes(b.status) && (
                          <option value={b.status}>{b.status}</option>
                        )}
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {updatingId === b.id && <span style={{ marginLeft: "8px" }}>Updating...</span>}
                    </td>
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

export default TrainBookings;