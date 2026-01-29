import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Hook to navigate between pages
import './MyBookings.css';

const MyBookings = () => {
  // useNavigate hook allows us to programmatically navigate to different routes
  const navigate = useNavigate();
  // State to manage filter selection (ALL, CONFIRMED, WAITLIST, CANCELLED)
  const [filterStatus, setFilterStatus] = useState('ALL');

  // Dummy booking data with all statuses
  const allBookings = [
    {
      id: 0,
      pnrNumber: '3216549870',
      trainName: 'Premium Express',
      trainNumber: '22105',
      from: 'Mumbai Central',
      to: 'Delhi New Delhi',
      departureDate: '2026-02-15',
      departureTime: '14:30',
      totalPassengers: 3,
      status: 'CONFIRMED',
      bookingDate: '2026-01-28',
      totalPrice: '₹4,530',
      passengers: ['John Doe', 'Jane Doe', 'Alex Doe']
    },
    {
      id: 1,
      pnrNumber: '1234567890',
      trainName: 'Express Train',
      trainNumber: '12345',
      from: 'Mumbai',
      to: 'Nagpur',
      departureDate: '2026-02-15',
      departureTime: '14:30',
      totalPassengers: 3,
      status: 'CONFIRMED',
      bookingDate: '2026-01-28',
      totalPrice: '₹4,500',
      passengers: ['John Doe', 'Jane Doe', 'Alex Doe']
    },
    {
      id: 2,
      pnrNumber: '9876543210',
      trainName: 'Rajdhani Express',
      trainNumber: '54321',
      from: 'Mumbai',
      to: 'Pune',
      departureDate: '2026-02-05',
      departureTime: '06:00',
      totalPassengers: 2,
      status: 'CONFIRMED',
      bookingDate: '2026-01-20',
      totalPrice: '₹3,200',
      passengers: ['Jane Smith', 'Emily Smith']
    },
    {
      id: 3,
      pnrNumber: '5555555555',
      trainName: 'Shatabdi Express',
      trainNumber: '11111',
      from: 'Pune',
      to: 'Mumbai',
      departureDate: '2025-12-25',
      departureTime: '09:15',
      totalPassengers: 1,
      status: 'CANCELLED',
      bookingDate: '2025-12-15',
      totalPrice: '₹1,500',
      passengers: ['Raj Kumar']
    }
  ];

  // Filter bookings based on selected status - returns all bookings or filtered by status
  // If filterStatus is 'ALL', show all bookings, otherwise filter by selected status
  const filteredBookings = filterStatus === 'ALL' 
    ? allBookings 
    : allBookings.filter(booking => booking.status === filterStatus);

  // Function to return appropriate CSS class based on booking status
  // This helps in styling the status badge with different colors (confirmed=green, cancelled=red, etc)
  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'CONFIRMED':
        return 'status-badge status-confirmed'; // Green badge for confirmed bookings
      case 'CANCELLED':
        return 'status-badge status-cancelled'; // Red badge for cancelled bookings
      case 'WAITLIST':
        return 'status-badge status-waitlist'; // Yellow badge for waitlist bookings
      default:
        return 'status-badge';
    }
  };

  // Function to check if a booking is upcoming (departure date is today or in future)
  // Returns true if departure date is >= today, false if it's in the past
  const isUpcoming = (departureDate) => {
    const departure = new Date(departureDate); // Convert string date to Date object
    const today = new Date(); // Get today's date
    return departure >= today; // Compare dates and return boolean
  };

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
        {/* Filter Section */}
        <div className="bookings-filter-section">
          <h2 className="filter-title">Filter by Status</h2>
          <div className="filter-buttons">
            {/* All Bookings button - shows all bookings regardless of status */}
            <button 
              className={`filter-btn ${filterStatus === 'ALL' ? 'active' : ''}`}
              onClick={() => setFilterStatus('ALL')}
            >
              All Bookings ({allBookings.length})
            </button>
            {/* Confirmed button - shows only confirmed bookings */}
            <button 
              className={`filter-btn ${filterStatus === 'CONFIRMED' ? 'active' : ''}`}
              onClick={() => setFilterStatus('CONFIRMED')}
            >
              Confirmed ({allBookings.filter(b => b.status === 'CONFIRMED').length})
            </button>
            {/* Waitlist button - shows only waitlist bookings */}
            <button 
              className={`filter-btn ${filterStatus === 'WAITLIST' ? 'active' : ''}`}
              onClick={() => setFilterStatus('WAITLIST')}
            >
              Waitlist ({allBookings.filter(b => b.status === 'WAITLIST').length})
            </button>
            {/* Cancelled button - shows only cancelled bookings */}
            <button 
              className={`filter-btn ${filterStatus === 'CANCELLED' ? 'active' : ''}`}
              onClick={() => setFilterStatus('CANCELLED')}
            >
              Cancelled ({allBookings.filter(b => b.status === 'CANCELLED').length})
            </button>
          </div>
        </div>

        {/* Bookings List */}
        <div className="bookings-list">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <div key={booking.id} className="booking-card">
                {/* Card Header with Status */}
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

                {/* Route Section */}
                <div className="booking-route">
                  <div className="route-item">
                    <p className="route-label">From</p>
                    <p className="route-value">{booking.from}</p>
                  </div>
                  <div className="route-arrow">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M7 10l5 5 5-5z" transform="rotate(90 12 12)"/>
                    </svg>
                  </div>
                  <div className="route-item">
                    <p className="route-label">To</p>
                    <p className="route-value">{booking.to}</p>
                  </div>
                </div>

                {/* Details Section */}
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

                {/* Passengers Section */}
                <div className="booking-passengers">
                  <h4 className="passengers-title">Passengers ({booking.totalPassengers})</h4>
                  <div className="passengers-list">
                    {booking.passengers.map((passenger, idx) => (
                      <div key={idx} className="passenger-badge">
                        {idx + 1}. {passenger}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="booking-actions">
                  {/* View Details button - navigates to ticket page to show complete ticket details */}
                  <button className="action-btn view-details" onClick={() => navigate('/home/ticket')}>View Details</button>
                  {/* Cancel Booking button - only shows for CONFIRMED bookings (conditional rendering) */}
                  {booking.status === 'CONFIRMED' && (
                    <button className="action-btn cancel-booking">Cancel Booking</button>
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
