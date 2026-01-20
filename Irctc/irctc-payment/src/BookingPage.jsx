import React from "react";
import { useNavigate } from "react-router-dom";

function BookingPage() {
  const navigate = useNavigate();

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
    <div style={{ padding: "30px" }}>
      <h2>Booking Page</h2>

      <button
        onClick={goToPayment}
        style={{
          padding: "12px 30px",
          background: "#003366",
          color: "white",
          border: "none",
          borderRadius: "6px",
        }}
      >
        Proceed to Payment
      </button>
    </div>
  );
}

export default BookingPage;
