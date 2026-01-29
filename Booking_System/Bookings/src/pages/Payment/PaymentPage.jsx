import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // useLocation to get booking data, useNavigate to redirect after payment
import axios from "axios"; // axios for making API calls
import "./PaymentPage.css";

function PaymentPage() {
  // useLocation hook gets the booking data passed from previous page
  const location = useLocation();
  // useNavigate hook allows us to redirect to ticket page after successful payment
  const navigate = useNavigate();
  // data contains booking information (passenger details, fares, etc)
  const data = location.state || {};
  // loading state to show loading message while processing payment
  const [loading, setLoading] = useState(false);

  const payNow = async () => {
    // If already processing payment, prevent duplicate requests
    if (loading) return;

    // Check if Razorpay SDK is loaded in the page
    // Razorpay SDK must be included in index.html script tags
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded. Please refresh.");
      return;
    }

    try {
      setLoading(true);

      // Step 1: Create order on backend with payment amount
      // This API call creates an order in Razorpay system
      const orderRes = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        { amount: data.totalFare }
      );

      // Get the order details from response
      const order = orderRes.data;

      // Step 2: Configure Razorpay payment options
      const options = {
        key: "rzp_test_S8dz8urvscAFMO", // Razorpay API Key
        amount: order.amount, // Amount in paise (₹)
        currency: "INR",
        name: "IRCTC 2.0",
        description: "Railway Ticket Booking",
        order_id: order.id, // Order ID from backend

        // Handler called when payment is successful
        handler: async (response) => {
          // Verify payment on backend to ensure payment was actually successful
          await axios.post(
            "http://localhost:5000/api/payment/verify-payment",
            response
          );
          alert("Payment Successful ✅");
          // Redirect to ticket page after successful payment
          navigate('/home/ticket');
          setLoading(false);
        },

        // Modal configuration - what happens when payment is cancelled/dismissed
        modal: {
          ondismiss: () => {
            setLoading(false);
            alert("Payment cancelled ❌");
          }
        },

        // Pre-fill customer information on Razorpay form
        prefill: {
          name: data.passengerName || "Passenger",
          email: "test@example.com",
          contact: "9999999999"
        },

        // Theme color for Razorpay payment form
        theme: { color: "#0b61a8" }
      };

      // Step 3: Initialize and open Razorpay payment modal
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
