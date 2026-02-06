import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { cancelBookingWithRefund, getCancellationPolicy } from '../../services/cancellation';
import './MyBookings.css';

const MyBookings = () => {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [allBookings, setAllBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingBookingId, setCancellingBookingId] = useState(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [cancellationMessage, setCancellationMessage] = useState('');
  const [cancellationError, setCancellationError] = useState('');

  // 🔹 Fetch bookings from backend
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:8080/bookings/my",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        // 🔹 Adapt backend → UI format
        const adapted = res.data.map(b => ({
          id: b.bookingId,
          pnrNumber: b.pnr,
          trainName: b.trainName,
          trainNumber: b.trainNumber,
          from: b.source,
          to: b.destination,
          departureDate: b.journeyDate,
          departureTime: b.departure?.split("T")[1],
          totalPassengers: b.passengers.length,
          status: b.bookingStatus,
          bookingDate: b.bookedOn?.split("T")[0],
        totalPrice: `₹${b.totalFare ?? 0}`,

          passengers: b.passengers.map(p => p.name),
          __raw: b   // 👈 store original booking
        }));

        setAllBookings(adapted);
      } catch (err) {
        console.error("Failed to load bookings", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const filteredBookings =
    filterStatus === 'ALL'
      ? allBookings
      : allBookings.filter(b => b.status === filterStatus);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'CONFIRMED': return 'status-badge status-confirmed';
      case 'CANCELLED': return 'status-badge status-cancelled';
      case 'WAITLIST': return 'status-badge status-waitlist';
      default: return 'status-badge';
    }
  };

  const isUpcoming = (departureDate) => {
    const departure = new Date(departureDate);
    const today = new Date();
    today.setHours(0,0,0,0);
    return departure >= today;
  };

  // 🔹 Handle cancel booking with refund
  const handleCancelBooking = async (booking) => {
    setCancellingBookingId(booking.id);
    setShowCancelConfirm(true);
  };

  // 🔹 Confirm and process cancellation with refund
  const confirmCancellation = async () => {
    try {
      setCancellationError('');
      setCancellationMessage('Processing cancellation and refund...');

      const booking = allBookings.find(b => b.id === cancellingBookingId);
      const result = await cancelBookingWithRefund(cancellingBookingId, booking.__raw);

      // Update local state
      const updatedBookings = allBookings.map(b =>
        b.id === cancellingBookingId
          ? { ...b, status: 'CANCELLED' }
          : b
      );
      setAllBookings(updatedBookings);

      setCancellationMessage(result.message || 'Booking cancelled and refund initiated successfully!');
      setShowCancelConfirm(false);

      // Clear message after 5 seconds
      setTimeout(() => {
        setCancellationMessage('');
      }, 5000);

    } catch (err) {
      console.error("Cancellation error:", err);
      setCancellationError(err.error || 'Failed to cancel booking. Please try again.');
      setCancellationMessage('');
    } finally {
      setCancellingBookingId(null);
    }
  };

  // 🔹 Cancel the confirmation dialog
  const cancelConfirmation = () => {
    setShowCancelConfirm(false);
    setCancellingBookingId(null);
    setCancellationMessage('');
    setCancellationError('');
  };

  if (loading) {
    return <h2 style={{ textAlign: "center", marginTop: "40px" }}>Loading bookings...</h2>;
  }

  return (
    <div className="my-bookings-container">

      <div
        className="my-bookings-hero"
        style={{
          backgroundImage: "url(/images/background_img.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="my-bookings-overlay"></div>
        <div className="my-bookings-hero-content">
          <h1 className="my-bookings-title">My Bookings</h1>
          <p className="my-bookings-subtitle">Manage your train reservations</p>
        </div>
      </div>

      <div className="my-bookings-content">

        {/* FILTERS */}
        <div className="bookings-filter-section">
          <h2 className="filter-title">Filter by Status</h2>
          <div className="filter-buttons">
            <button className={`filter-btn ${filterStatus === 'ALL' ? 'active' : ''}`}
              onClick={() => setFilterStatus('ALL')}>
              All Bookings ({allBookings.length})
            </button>
            <button className={`filter-btn ${filterStatus === 'CONFIRMED' ? 'active' : ''}`}
              onClick={() => setFilterStatus('CONFIRMED')}>
              Confirmed ({allBookings.filter(b => b.status === 'CONFIRMED').length})
            </button>
            <button className={`filter-btn ${filterStatus === 'WAITLIST' ? 'active' : ''}`}
              onClick={() => setFilterStatus('WAITLIST')}>
              Waitlist ({allBookings.filter(b => b.status === 'WAITLIST').length})
            </button>
            <button className={`filter-btn ${filterStatus === 'CANCELLED' ? 'active' : ''}`}
              onClick={() => setFilterStatus('CANCELLED')}>
              Cancelled ({allBookings.filter(b => b.status === 'CANCELLED').length})
            </button>
          </div>
        </div>

        {/* BOOKINGS LIST */}
        <div className="bookings-list">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <div key={booking.id} className="booking-card">

                <div className="booking-card-header">
                  <div className="booking-header-left">
                    <h3 className="booking-train-name">{booking.trainName}</h3>
                    <p className="booking-train-number">Train #{booking.trainNumber}</p>
                  </div>
                  <div className="booking-header-right">
                    <span className={getStatusBadgeClass(booking.status)}>
                      {booking.status}
                    </span>
                    {isUpcoming(booking.departureDate) && (
                      <span className="upcoming-badge">Upcoming</span>
                    )}
                  </div>
                </div>

                <div className="booking-route">
                  <div className="route-item">
                    <p className="route-label">From</p>
                    <p className="route-value">{booking.from}</p>
                  </div>
                  <div className="route-arrow">→</div>
                  <div className="route-item">
                    <p className="route-label">To</p>
                    <p className="route-value">{booking.to}</p>
                  </div>
                </div>

                <div className="booking-details-grid">
                  <div className="detail-item">
                    <label>Departure Date</label>
                    <p>{booking.departureDate}</p>
                  </div>
                  <div className="detail-item">
                    <label>Departure Time</label>
                    <p>{booking.departureTime}</p>
                  </div>
                  <div className="detail-item">
                    <label>PNR Number</label>
                    <p className="pnr-highlight">{booking.pnrNumber}</p>
                  </div>
                  <div className="detail-item">
                    <label>Total Price</label>
                    <p className="price-highlight">{booking.totalPrice}</p>
                  </div>
                </div>

                <div className="booking-passengers">
                  <h4 className="passengers-title">
                    Passengers ({booking.totalPassengers})
                  </h4>
                  <div className="passengers-list">
                    {booking.passengers.map((p, idx) => (
                      <div key={idx} className="passenger-badge">
                        {idx + 1}. {p}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="booking-actions">
                  <button
                    className="action-btn view-details"
                    onClick={() =>
                      navigate('/home/ticket', {
                        state: booking.__raw
                      })
                    }
                  >
                    View Details
                  </button>

                  {booking.status === 'CONFIRMED' && (
                    <button 
                      className="action-btn cancel-booking"
                      onClick={() => handleCancelBooking(booking)}
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>

              </div>
            ))
          ) : (
            <div className="no-bookings">
              <p>No bookings found for this filter.</p>
            </div>
          )}
        </div>
      </div>

      {/* 🔹 NOTIFICATION MESSAGES */}
      {cancellationMessage && (
        <div className="notification success-notification">
          <p>{cancellationMessage}</p>
          <button onClick={() => setCancellationMessage('')} className="close-notification">×</button>
        </div>
      )}

      {cancellationError && (
        <div className="notification error-notification">
          <p>{cancellationError}</p>
          <button onClick={() => setCancellationError('')} className="close-notification">×</button>
        </div>
      )}

      {/* 🔹 CANCELLATION CONFIRMATION MODAL */}
      {showCancelConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Cancel Booking?</h2>
            <p>You are about to cancel your booking. This action will:</p>
            <ul>
              <li>✓ Update your booking status to CANCELLED</li>
              <li>✓ Initiate a refund to your original payment method</li>
              <li>✓ Refunds typically appear within 5-7 business days</li>
            </ul>

            <div className="cancellation-note">
              <p><strong>Note:</strong> Refund amount depends on cancellation timing and may include cancellation charges.</p>
            </div>

            <div className="modal-actions">
              <button 
                className="modal-btn confirm-btn"
                onClick={confirmCancellation}
              >
                Yes, Cancel & Refund
              </button>
              <button 
                className="modal-btn cancel-btn"
                onClick={cancelConfirmation}
              >
                No, Keep Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
