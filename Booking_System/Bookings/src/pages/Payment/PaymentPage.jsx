import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./PaymentPage.css";

function PaymentPage() {
  const location = useLocation();
  const data = location.state || {};
  const [loading, setLoading] = useState(false);

  const payNow = async () => {
    if (loading) return;

    // Safety: Razorpay SDK check
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded. Please refresh.");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Create order
      const orderRes = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        { amount: data.totalFare }
      );

      const order = orderRes.data;

      // 2️⃣ Razorpay options
      const options = {
        key: "rzp_test_S8dz8urvscAFMO",
        amount: order.amount,
        currency: "INR",
        name: "IRCTC 2.0",
        description: "Railway Ticket Booking",
        order_id: order.id,

        handler: async (response) => {
          await axios.post(
            "http://localhost:5000/api/payment/verify-payment",
            response
          );
          alert("Payment Successful ✅");
          setLoading(false);
        },

        modal: {
          ondismiss: () => {
            setLoading(false);
            alert("Payment cancelled ❌");
          }
        },

        prefill: {
          name: data.passengerName || "Passenger",
          email: "test@example.com",
          contact: "9999999999"
        },

        theme: { color: "#0b61a8" }
      };

      // 3️⃣ Open Razorpay
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Payment failed ❌");
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="wrapper">
      <div className="payment-box">

        <h2 className="header">Payment</h2>

        {/* Passenger Summary */}
        <div className="details-box">
          <p><b>Name:</b> {data.passengerName}</p>
          <p><b>Age:</b> {data.age}</p>
          <p><b>Gender:</b> {data.gender}</p>
          <p><b>Train:</b> {data.trainNo} – {data.trainName}</p>
          <p><b>Class:</b> {data.classType}</p>
        </div>

        {/* Fare Summary */}
        <div className="fare-box">
          <p>Base Fare: ₹{data.baseFare}</p>
          <p>Reservation Fee: ₹{data.reservationFee}</p>
          <p>Convenience Fee: ₹{data.convFee}</p>
          <p>GST: ₹{data.gst}</p>
          <hr />
          <p className="total">
            <b>Total Payable: ₹{data.totalFare}</b>
          </p>
        </div>

        {/* Razorpay Button (same position & style) */}
        <button
          className="pay-btn"
          onClick={payNow}
          disabled={loading}
        >
          {loading
            ? "Processing Payment..."
            : `Pay using Razorpay ₹${data.totalFare}`}
        </button>

      </div>
    </div>
  );
}

export default PaymentPage;
