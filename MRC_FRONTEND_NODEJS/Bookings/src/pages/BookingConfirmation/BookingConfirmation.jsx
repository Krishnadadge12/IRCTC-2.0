import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BookingConfirmation.css";

function BookingConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};

  if (!state || Object.keys(state).length === 0) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        No booking data found!
      </h2>
    );
  }

  const {
    reservationQuota,
    trainNumber,
    journeyFrom,
    journeyTo,
    date,
    departureTime,
    passengers
  } = state;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const goToPayment = () => {
  const bookingDraft = JSON.parse(
    sessionStorage.getItem("bookingDraft")
  );

  if (!bookingDraft) {
    alert("Booking data missing. Restart booking.");
    return;
  }

  if (!bookingDraft.seatPriceId) {
    alert("Seat price missing from train data. Restart booking.");
    return;
  }

  // FINAL payment payload (MINIMAL & CORRECT)
  const paymentData = {
    seatPriceId: bookingDraft.seatPriceId,
    passengers,
    journeyDate: bookingDraft.journeyDate
  };

  console.log("💳 FINAL paymentData:", paymentData);

  sessionStorage.setItem(
    "paymentData",
    JSON.stringify(paymentData)
  );

  navigate("/home/payment", {
    state: paymentData
  });
};





  return (
    <div className="confirmation-bg">
      <div className="bg-overlay" />
      <div className="container confirmation-container">
        <h1 className="confirm-title" id="review">Booking Review</h1>

        {/* Journey Details */}
        <div className="journey-card-clean">
          <h3 className="section-title">Journey Details</h3>

          <div className="journey-detail-row">
            <span className="label">Reservation Quota:</span>
            <span className="value">{reservationQuota}</span>
          </div>

          <div className="journey-detail-row">
            <span className="label">Train Number / Name:</span>
            <span className="value">{trainNumber}</span>
          </div>

          <div className="journey-detail-row">
            <span className="label">From:</span>
            <span className="value">{journeyFrom}</span>
          </div>

          <div className="journey-detail-row">
            <span className="label">To:</span>
            <span className="value">{journeyTo}</span>
          </div>

          <div className="journey-detail-row">
            <span className="label">Departure Date:</span>
            <span className="value highlight-date-box">{date}</span>
          </div>

          <div className="journey-detail-row highlight-row">
            <span className="label">Departure Time:</span>
            <span className="value highlight-time">{departureTime || "—"}</span>
          </div>
        </div>

        {/* Passengers */}
        <div className="section-card">
          <h3>Passenger Details</h3>

          {passengers.map((p, idx) => (
            <div className="passenger-card-confirm" key={idx}>
              <h4>Passenger {idx + 1}</h4>
              <p>{p.fullName} | {p.age} | {p.sex}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "20px", display: "flex", gap: "15px" }}>
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/home/booking", { state })}
          >
            Back to Booking
          </button>

          <button
            className="btn btn-success"
            onClick={goToPayment}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmation;
