import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Ticket.css';

const Ticket = () => {
  const navigate = useNavigate();
  const ticketRef = useRef();
  const { state } = useLocation();

  if (!state) {
    return <h2 style={{ textAlign: "center" }}>No ticket found</h2>;
  }

  const ticketData = state;

  // ================== ADAPTER (UPDATED — still backend-safe) ==================
  const adaptedTicketData = {
    bookingConfirmationNumber: ticketData.bookingId,
    pnrNumber: ticketData.pnr,
    bookingDate: ticketData.bookedOn?.split("T")[0],

    train: {
      name: ticketData.trainName,
      number: ticketData.trainNumber
    },

    coach: {
      type: ticketData.coachType || "N/A",
      coachNumber: ticketData.coachNo
    },

    journey: {
      from: ticketData.source,
      to: ticketData.destination,
      departureDate: ticketData.journeyDate,
      departureTime: ticketData.departure?.split("T")[1],
      arrivalDate: ticketData.journeyDate,
      arrivalTime: ticketData.arrival?.split("T")[1],
      duration: ticketData.duration || "--",
      platformNumber: "--"
    },

    // 🔥 UPDATED PASSENGER MAPPING (NEAT SEAT/BERTH — backend compatible)
    passengers: ticketData.passengers.map((p, idx) => {

      const berthMap = {
        "LB": "Lower Berth",
        "MB": "Middle Berth",
        "UB": "Upper Berth",
        "SL": "Side Lower",
        "SU": "Side Upper"
      };

      // Extract berth code from seatLabel (safe regex)
      const berthCode =
        p.seatLabel?.match(/(LB|MB|UB|SL|SU)$/)?.[0];

      return {
        id: idx + 1,
        name: p.name,
        age: p.age,
        sex: p.gender,

        seatNumber: p.seatNo || "WL",
        coachNo: p.coachNo || "--",

        berthFull: berthCode ? berthMap[berthCode] : "Not Allotted",

        bookingStatus: ticketData.bookingStatus
      };
    }),

    fare: {
      totalFare: ticketData.totalFare
    },

    important: [
      "Please carry a valid ID proof",
      "Arrive at the station 30 minutes early",
      "Ticket is valid only for the booked journey"
    ]
  };
  // ================== END ADAPTER ==================

  const downloadTicket = () => {
    window.print();
  };

  return (
    <div className="ticket-container">
      <div className="ticket-header">
        <h1 className="ticket-main-title">Ticket Booked Successfully!</h1>
        <p className="ticket-subtitle">Your payment has been processed</p>
      </div>

      <div className="ticket-content">

        {/* Payment Status */}
        <div className="payment-status-section">
          <div className="status-badge success">
            <span className="status-icon">✓</span>
            <div className="status-text">
              <p className="status-title">Payment Successful</p>
              <p className="status-date">Paid on {adaptedTicketData.bookingDate}</p>
            </div>
          </div>
        </div>

        {/* Ticket */}
        <div className="ticket-wrapper" ref={ticketRef}>
          <div className="ticket">

            {/* Header */}
            <div className="ticket-header-section">
              <div className="header-left">
                <h2 className="ticket-title">Railway Ticket</h2>
                <p className="indian-railways">Indian Railways</p>
              </div>
              <div className="header-right">
                <div className="confirmation-box">
                  <p className="label">Confirmation #</p>
                  <p className="value">{adaptedTicketData.bookingConfirmationNumber}</p>
                </div>
              </div>
            </div>

            {/* PNR */}
            <div className="pnr-section">
              <div className="pnr-box">
                <p className="label">PNR Number</p>
                <p className="pnr-value">{adaptedTicketData.pnrNumber}</p>
              </div>
              <div className="booking-date-box">
                <p className="label">Booking Date</p>
                <p className="value">{adaptedTicketData.bookingDate}</p>
              </div>
            </div>

            {/* Train Details */}
            <div className="section">
              <h3 className="section-title">Train Details</h3>
              <div className="train-info-grid">
                <div className="info-item">
                  <label>Train Name</label>
                  <p>{adaptedTicketData.train.name}</p>
                </div>
                <div className="info-item">
                  <label>Train Number</label>
                  <p>{adaptedTicketData.train.number}</p>
                </div>
                <div className="info-item">
                  <label>Coach Type</label>
                  <p>{adaptedTicketData.coach.type}</p>
                </div>
                <div className="info-item">
                  <label>Coach Number</label>
                  <p>{adaptedTicketData.coach.coachNumber}</p>
                </div>
              </div>
            </div>

            {/* Journey */}
            <div className="section">
              <h3 className="section-title">Journey Details</h3>
              <div className="journey-route">

                <div className="journey-station">
                  <div className="station-circle"></div>
                  <div className="station-info">
                    <p className="station-name">{adaptedTicketData.journey.from}</p>
                    <p className="station-datetime">
                      {adaptedTicketData.journey.departureDate} | {adaptedTicketData.journey.departureTime}
                    </p>
                    <p className="platform">Platform {adaptedTicketData.journey.platformNumber}</p>
                  </div>
                </div>

                <div className="journey-line">
                  <p className="duration">{adaptedTicketData.journey.duration}</p>
                </div>

                <div className="journey-station arrival">
                  <div className="station-circle"></div>
                  <div className="station-info">
                    <p className="station-name">{adaptedTicketData.journey.to}</p>
                    <p className="station-datetime">
                      {adaptedTicketData.journey.arrivalDate} | {adaptedTicketData.journey.arrivalTime}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* ================== UPDATED PASSENGER TABLE ================== */}
            <div className="section">
              <h3 className="section-title">Passenger Details</h3>
              <table className="passengers-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Passenger Name</th>
                    <th>Age</th>
                    <th>Sex</th>
                    <th>Seat / Coach / Berth</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {adaptedTicketData.passengers.map(p => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.name}</td>
                      <td>{p.age}</td>
                      <td>{p.sex}</td>

                      <td>
                        {p.seatNumber !== "WL" ? (
                          <>
                            <div><b>Seat:</b> {p.seatNumber}</div>
                            <div><b>Coach:</b> {p.coachNo}</div>
                            <div><b>Berth:</b> {p.berthFull}</div>
                          </>
                        ) : (
                          <span className="wl-text">WL (Waitlist)</span>
                        )}
                      </td>

                      <td>
                        <span className="status-badge-small confirmed">
                          {p.bookingStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* ================== END UPDATED SECTION ================== */}

            {/* Fare */}
            <div className="section">
              <h3 className="section-title">Fare</h3>
              <div className="fare-row total">
                <span>Total Amount Paid</span>
                <span>₹{adaptedTicketData.fare.totalFare}</span>
              </div>
            </div>

            {/* Notes */}
            <div className="section important-section">
              <h3 className="section-title">Important Notes</h3>
              <ul>
                {adaptedTicketData.important.map((n, i) => (
                  <li key={i}>{n}</li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Actions */}
        <div className="ticket-actions">
          <button className="btn btn-download" onClick={downloadTicket}>
            📥 Download/Print Ticket
          </button>
          <button className="btn btn-my-bookings" onClick={() => navigate('/home/my-bookings')}>
            📋 View My Bookings
          </button>
          <button className="btn btn-home" onClick={() => navigate('/home')}>
            🏠 Back to Home
          </button>
        </div>

      </div>
    </div>
  );
};

export default Ticket;
