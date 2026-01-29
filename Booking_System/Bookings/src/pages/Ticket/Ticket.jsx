import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Hook to navigate between pages
import './Ticket.css';

const Ticket = () => {
  // useNavigate hook allows us to programmatically navigate to different routes
  const navigate = useNavigate();
  // useRef is used to reference the ticket element for printing functionality
  const ticketRef = useRef();

  // Dummy ticket data (simulating successful payment)
  const ticketData = {
    pnrNumber: '3216549870',
    bookingConfirmationNumber: 'CONF123456789',
    bookingDate: '2026-01-28',
    paymentStatus: 'SUCCESS',
    paymentDate: '2026-01-28',
    
    train: {
      name: 'Premium Express',
      number: '22105',
      runningDay: 'Daily except Sundays'
    },

    journey: {
      from: 'Mumbai Central',
      to: 'Delhi New Delhi',
      departureDate: '2026-02-15',
      departureTime: '14:30',
      arrivalDate: '2026-02-16',
      arrivalTime: '08:45',
      duration: '18 hours 15 minutes',
      platformNumber: 'Platform 7'
    },

    coach: {
      type: '3AC - AC 3-Tier',
      coachNumber: 'B1',
    },

    passengers: [
      {
        id: 1,
        name: 'John Doe',
        age: '35',
        sex: 'Male',
        seatNumber: '23',
        berth: 'Lower',
        bookingStatus: 'CONFIRMED'
      },
      {
        id: 2,
        name: 'Jane Doe',
        age: '32',
        sex: 'Female',
        seatNumber: '24',
        berth: 'Middle',
        bookingStatus: 'CONFIRMED'
      },
      {
        id: 3,
        name: 'Alex Doe',
        age: '8',
        sex: 'Male',
        seatNumber: '25',
        berth: 'Upper',
        bookingStatus: 'CONFIRMED'
      }
    ],

    fare: {
      baseFare: 1200,
      reservationFee: 50,
      convenienceFee: 30,
      gst: 230,
      totalFare: 1510
    },

    important: [
      'Please reach the station 30 minutes before departure',
      'Keep your ticket and ID proof with you',
      'This is a computer-generated ticket, no signature required',
      'No cancellation allowed 4 hours before departure'
    ]
  };

  // Function to handle ticket download/print - uses browser's print dialog
  const downloadTicket = () => {
    // window.print() opens the browser's print dialog
    window.print();
  };

  return (
    <div className="ticket-container">
      <div className="ticket-header">
        <h1 className="ticket-main-title">Ticket Booked Successfully!</h1>
        <p className="ticket-subtitle">Your payment has been processed</p>
      </div>

      <div className="ticket-content">
        {/* Success Status */}
        <div className="payment-status-section">
          <div className="status-badge success">
            <span className="status-icon">✓</span>
            <div className="status-text">
              <p className="status-title">Payment Successful</p>
              <p className="status-date">Paid on {ticketData.paymentDate}</p>
            </div>
          </div>
        </div>

        {/* Main Ticket */}
        <div className="ticket-wrapper" ref={ticketRef}>
          <div className="ticket">
            {/* Ticket Header */}
            <div className="ticket-header-section">
              <div className="header-left">
                <h2 className="ticket-title">Railway Ticket</h2>
                <p className="indian-railways">Indian Railways</p>
              </div>
              <div className="header-right">
                <div className="confirmation-box">
                  <p className="label">Confirmation #</p>
                  <p className="value">{ticketData.bookingConfirmationNumber}</p>
                </div>
              </div>
            </div>

            {/* PNR and Important Info */}
            <div className="pnr-section">
              <div className="pnr-box">
                <p className="label">PNR Number</p>
                <p className="pnr-value">{ticketData.pnrNumber}</p>
              </div>
              <div className="booking-date-box">
                <p className="label">Booking Date</p>
                <p className="value">{ticketData.bookingDate}</p>
              </div>
            </div>

            {/* Train Information */}
            <div className="section">
              <h3 className="section-title">Train Details</h3>
              <div className="train-info-grid">
                <div className="info-item">
                  <label>Train Name</label>
                  <p>{ticketData.train.name}</p>
                </div>
                <div className="info-item">
                  <label>Train Number</label>
                  <p>{ticketData.train.number}</p>
                </div>
                <div className="info-item">
                  <label>Coach Type</label>
                  <p>{ticketData.coach.type}</p>
                </div>
                <div className="info-item">
                  <label>Coach Number</label>
                  <p>{ticketData.coach.coachNumber}</p>
                </div>
              </div>
            </div>

            {/* Journey Information */}
            <div className="section">
              <h3 className="section-title">Journey Details</h3>
              <div className="journey-route">
                <div className="journey-station">
                  <div className="station-circle"></div>
                  <div className="station-info">
                    <p className="station-name">{ticketData.journey.from}</p>
                    <p className="station-datetime">
                      {ticketData.journey.departureDate} | {ticketData.journey.departureTime}
                    </p>
                    <p className="platform">Platform {ticketData.journey.platformNumber}</p>
                  </div>
                </div>

                <div className="journey-line">
                  <p className="duration">{ticketData.journey.duration}</p>
                </div>

                <div className="journey-station arrival">
                  <div className="station-circle"></div>
                  <div className="station-info">
                    <p className="station-name">{ticketData.journey.to}</p>
                    <p className="station-datetime">
                      {ticketData.journey.arrivalDate} | {ticketData.journey.arrivalTime}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Passengers */}
            <div className="section">
              <h3 className="section-title">Passenger Details</h3>
              <div className="passengers-table-wrapper">
                <table className="passengers-table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Passenger Name</th>
                      <th>Age</th>
                      <th>Sex</th>
                      <th>Seat/Berth</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ticketData.passengers.map((passenger) => (
                      <tr key={passenger.id}>
                        <td>{passenger.id}</td>
                        <td>{passenger.name}</td>
                        <td>{passenger.age}</td>
                        <td>{passenger.sex}</td>
                        <td>{passenger.seatNumber} ({passenger.berth})</td>
                        <td>
                          <span className="status-badge-small confirmed">
                            {passenger.bookingStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Fare Display */}
            <div className="section">
              <h3 className="section-title">Fare</h3>
              <div className="fare-breakup">
                <div className="fare-row total">
                  <span>Total Amount Paid</span>
                  <span>₹{ticketData.fare.totalFare}</span>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="section important-section">
              <h3 className="section-title">Important Notes</h3>
              <ul className="important-list">
                {ticketData.important.map((note, idx) => (
                  <li key={idx}>{note}</li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <div className="ticket-footer">
              <p className="footer-text">This is a computer-generated ticket. No signature is required.</p>
              <p className="footer-text">For more information, visit www.indianrailways.gov.in</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="ticket-actions">
          {/* Download/Print button - triggers window.print() for printing ticket */}
          <button className="btn btn-download" onClick={downloadTicket}>
            📥 Download/Print Ticket
          </button>
          {/* Navigate to My Bookings page - shows all user's bookings */}
          <button className="btn btn-my-bookings" onClick={() => navigate('/home/my-bookings')}>
            📋 View My Bookings
          </button>
          {/* Navigate back to Home page */}
          <button className="btn btn-home" onClick={() => navigate('/home')}>
            🏠 Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
