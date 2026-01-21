import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BookingConfirmation.css";

function BookingConfirmation() {


    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);
    if (!state) {
        return <h2 style={{ textAlign: "center", marginTop: "40px" }}>No booking data found!</h2>;
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

    const bookingData = {
        passengerName: "Krishna Anil",
        age: 21,
        gender: "Male",
        trainNo: "12224",
        trainName: "Mumbai CSMT → Pune Intercity Express",
        classType: "Sleeper (SL)",

        // Fare Breakdown
        baseFare: 1400,
        reservationFee: 20,
        convFee: 30,
        gst: 50
    };

    bookingData.totalFare =
        bookingData.baseFare +
        bookingData.reservationFee +
        bookingData.convFee +
        bookingData.gst;

    const goToPayment = () => {
        navigate("/payment", { state: bookingData });
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

                    <div className="journey-detail-row ">
                        <span className="label">Departure Date:</span>
                        <span className="value highlight-date-box">{date}</span>
                    </div>

                    <div className="journey-detail-row highlight-row">
                        <span className="label">Departure Time:</span>
                        <span className="value highlight-time">{departureTime}</span>
                    </div>
                </div>



                {/* Passengers */}
                <div className="section-card">
                    <h3>Passenger Details</h3>

                    {passengers.map((p, idx) => (
                        <div className="passenger-card-confirm" key={idx}>
                            <div className="passenger-header-confirm">
                                <span className="badge-number">{idx + 1}</span>
                                <h4>Passenger {idx + 1}</h4>
                            </div>

                            <div className="passenger-grid">
                                <div className="field-box">
                                    <label>Name</label>
                                    <p>{p.fullName}</p>
                                </div>

                                <div className="field-box">
                                    <label>Age</label>
                                    <p>{p.age}</p>
                                </div>

                                <div className="field-box">
                                    <label>Sex</label>
                                    <p>{p.sex}</p>
                                </div>

                                <div className="field-box">
                                    <label>Berth Pref.</label>
                                    <p>{p.berth}</p>
                                </div>

                                <div className="field-box">
                                    <label>Phone</label>
                                    <p>{p.phone}</p>
                                </div>

                                <div className="field-box">
                                    <label>Email</label>
                                    <p>{p.email}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

                {/* Payment Info */}
                <div className="section-card payment-info">
                    <h3>Next Step</h3>
                    <p>
                        Your booking has been recorded.
                        <strong>To complete the reservation, please proceed to the payment counter.</strong>
                    </p>
                </div>

                <div style={{ marginTop: "20px", display: "flex", gap: "15px" }}>
                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate("/booking", { state })}
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
