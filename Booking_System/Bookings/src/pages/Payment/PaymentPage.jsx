import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../services/api";
import "./PaymentPage.css";

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const paymentData =
    location.state ||
    JSON.parse(sessionStorage.getItem("paymentData"));

  if (!paymentData || !paymentData.seatFare || !paymentData.passengers) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        Payment data missing. Please start booking again.
      </h2>
    );
  }

  const { seatFare, passengers, journeyDate } = paymentData;

  const passengerCount = passengers.length;
  const totalFare = seatFare * passengerCount;

  const [loading, setLoading] = useState(false);

  const payNow = async () => {
    if (loading) return;

    // ✅ ONLY check presence
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Session expired. Please login again.");
      navigate("/home/login");
      return;
    }

    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded. Please refresh.");
      return;
    }

    if (totalFare <= 0) {
      alert("Invalid fare amount");
      return;
    }

    try {
      setLoading(true);

      // Step 1: Create Razorpay order
      const orderRes = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        { amount: totalFare }
      );

      const order = orderRes.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "MRC",
        description: "Railway Ticket Booking",
        order_id: order.id,

        handler: async (response) => {
          try {
            // Step 2: Verify payment
            const verifyRes = await axios.post(
              "http://localhost:5000/api/payment/verify-payment",
              response
            );

            if (verifyRes.data.status !== "Payment verified") {
              alert("Payment verification failed ❌");
              return;
            }

            // Step 3: Final booking
            const bookingDraftStr =
              sessionStorage.getItem("bookingDraft");

            if (!bookingDraftStr) {
              alert("Booking data missing ❌");
              return;
            }

            const bookingDraft = JSON.parse(bookingDraftStr);

            const bookingRes = await api.post(
  "/bookings",
  {
    ...bookingDraft,
    razorpayPaymentId: response.razorpay_payment_id  
  }
);

            // Cleanup
            sessionStorage.removeItem("bookingDraft");
            sessionStorage.removeItem("paymentData");

            alert("Payment Successful ✅");

            navigate("/home/ticket", {
              state: bookingRes.data
            });

          } catch (err) {
            console.error(err);
            await axios.post("http://localhost:5137/api/logs", {
              message: `Booking failed after successful payment | Payment ID: ${response.razorpay_payment_id}`
         });
            alert("Booking failed after payment ❌");
          } finally {
            setLoading(false);
          }
        },

        modal: {
          ondismiss: () => {
            setLoading(false);
            alert("Payment cancelled ❌");
          }
        },

        prefill: {
          name: passengers[0]?.fullName || "Passenger",
          email: passengers[0]?.email || "",
          contact: passengers[0]?.phone || ""
        },

        theme: { color: "#0b61a8" }
      };

      new window.Razorpay(options).open();

    } catch (err) {
      console.error(err);
      alert("Payment failed ❌");
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="wrapper">
      <div className="payment-box">

        <h2 className="header">Payment</h2>

        <div className="details-box">
          <p><b>Passengers:</b> {passengerCount}</p>
          <p><b>Journey Date:</b> {journeyDate}</p>
        </div>

        <div className="fare-box">
          <p><b>Seat Fare (per passenger):</b> ₹{seatFare}</p>
          <p><b>Passengers:</b> {passengerCount}</p>
          <hr />
          <p className="total">
            <b>Total Payable: ₹{totalFare}</b>
          </p>
        </div>

        <button
          className="pay-btn"
          onClick={payNow}
          disabled={loading}
        >
          {loading
            ? "Processing Payment..."
            : `Pay using Razorpay ₹${totalFare}`}
        </button>

      </div>
    </div>
  );
}

export default PaymentPage;
