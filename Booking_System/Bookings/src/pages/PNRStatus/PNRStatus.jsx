import React, { useState } from "react";
import api from "../../services/api";
import "./PNRStatus.css";

const PNRStatus = () => {
  const [pnrNumber, setPnrNumber] = useState("");
  const [statusData, setStatusData] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!pnrNumber.trim()) {
      alert("Please enter a PNR number");
      return;
    }

    try {
      const res = await api.get(`/pnr/${pnrNumber}`);
      setStatusData(res.data);
    } catch (err) {
      setStatusData(null);
      alert("PNR not found");
    }

    setSubmitted(true);
  };

  return (
    <div className="pnr-container">
      <div className="pnr-card">
        <h1 className="pnr-title">Check PNR Status</h1>

        <form onSubmit={handleSearch} className="pnr-form">
          <input
            type="text"
            placeholder="Enter PNR number"
            value={pnrNumber}
            onChange={(e) => setPnrNumber(e.target.value)}
            className="pnr-input"
          />
          <button type="submit" className="pnr-btn">
            Check Status
          </button>
        </form>

        {submitted && statusData && (
          <div className="pnr-result">
            <h2>Booking Details</h2>

            {/* STATUS */}
            <div className="pnr-status-badge">
              <span
                className={`badge ${
                  statusData.bookingStatus === "CONFIRMED"
                    ? "confirmed"
                    : "waitlisted"
                }`}
              >
                {statusData.bookingStatus}
              </span>
            </div>

            {/* BOOKING INFO */}
            <div className="pnr-details-grid">
              <p><b>PNR:</b> {statusData.pnr}</p>
              <p><b>Train:</b> {statusData.trainName} ({statusData.trainNumber})</p>
              <p><b>From:</b> {statusData.source}</p>
              <p><b>To:</b> {statusData.destination}</p>
              <p><b>Journey Date:</b> {statusData.journeyDate}</p>
              <p><b>Quota:</b> {statusData.reservationQuota}</p>
              <p><b>Coach Type:</b> {statusData.coachType}</p>
              <p><b>Booked On:</b> {statusData.bookedOn}</p>
            </div>

            {/* PASSENGERS */}
            <h3>Passengers ({statusData.passengers.length})</h3>

            {statusData.passengers.map((p, idx) => (
              <div key={idx} className="passenger-card">
                <p><b>Name:</b> {p.fullName}</p>
                <p><b>Age:</b> {p.age}</p>
                <p><b>Gender:</b> {p.gender}</p>
                <p><b>Coach:</b> {p.coachNo || "—"}</p>
                <p><b>Seat No:</b> {p.seatNo || "—"}</p>
                <p><b>Seat Label:</b> {p.seatLabel || "—"}</p>
              </div>
            ))}
          </div>
        )}

        {submitted && !statusData && (
          <p className="pnr-error">No booking found for this PNR.</p>
        )}
      </div>
    </div>
  );
};

export default PNRStatus;
