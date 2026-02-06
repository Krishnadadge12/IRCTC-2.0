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

  // --------- VALIDATION (CORRECT THIS TIME) ----------
  if (
    !paymentData ||
    !paymentData.seatPriceId ||
    !paymentData.passengers
  ) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        Payment data missing. Please start booking again.
      </h2>
    );
  }

  const { seatPriceId, passengers, journeyDate } = paymentData;
  const passengerCount = passengers.length;

  const [seatFare, setSeatFare] = useState(null);
  const [loading, setLoading] = useState(false);

  // --------- SCROLL TO TOP ----------
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // --------- 🔥 IMPORTANT: GET FARE FROM BACKEND ----------
  useEffect(() => {
    const fetchFare = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:8080/trains/seat-fare/${seatPriceId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log("Fetched fare:", res.data);
        setSeatFare(res.data.price);
      } catch (err) {
        console.error("Failed to fetch fare:", err);
        alert("Could not fetch seat fare. Please restart booking.");
        navigate("/home");
      }
    };

    fetchFare();
  }, [seatPriceId, navigate]);

  const totalFare = seatFare * passengerCount;

  const payNow = async () => {
    if (loading) return;

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

    try {
      setLoading(true);

      // --------- STEP 1: CREATE RAZORPAY ORDER ----------
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
            // --------- STEP 2: VERIFY PAYMENT ----------
            const verifyRes = await axios.post(
              "http://localhost:5000/api/payment/verify-payment",
              response
            );

            if (!verifyRes.data.verified) {
              alert("Payment verification failed ❌");
              setLoading(false);
              return;
            }

            // --------- STEP 3: FINAL BOOKING ----------
            const bookingDraftStr =
              sessionStorage.getItem("bookingDraft");

            if (!bookingDraftStr) {
              alert("Booking data missing ❌");
              setLoading(false);
              return;
            }

            const bookingDraft = JSON.parse(bookingDraftStr);

            if (!bookingDraft.seatPriceId) {
              alert("Seat price missing. Please restart booking.");
              setLoading(false);
              return;
            }
            console.log("FINAL BOOKING PAYLOAD:", {
              ...bookingDraft,
              seatPriceId,
              razorpayPaymentId: response.razorpay_payment_id
            });

            const bookingRes = await api.post(
              "/bookings",
              {
                ...bookingDraft,

                razorpayPaymentId: response.razorpay_payment_id
              },
              {
                headers: {
                  "Idempotency-Key": response.razorpay_payment_id
                }
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

  return (
    <div className="wrapper">
      <div className="payment-box">

        <h2 className="header">Payment</h2>

        {seatFare === null ? (
          <h3 style={{ textAlign: "center", marginTop: "40px" }}>Loading fare...</h3>
        ) : (
          <>
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
          </>
        )}

      </div>
    </div>
  );
}

export default PaymentPage;
