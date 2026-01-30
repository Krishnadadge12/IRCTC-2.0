import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MyBookings.css';

const MyBookings = () => {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [allBookings, setAllBookings] = useState([]);
  const [loading, setLoading] = useState(true);

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
          totalPrice: `₹${b.totalFare}`,
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
                    <button className="action-btn cancel-booking">
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
    </div>
  );
};

export default MyBookings;
