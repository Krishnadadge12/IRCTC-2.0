import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./PaymentPage.css";

function PaymentPage() {
  const location = useLocation();
  const data = location.state || {}; // Prevent crash

  const [method, setMethod] = useState("");

  return (
    <div className="wrapper">

      {/* HEADER */}
      <header className="header">
        <img src="./irctclogo.png" alt="IRCTC Logo" />
        <h2>IRCTC – Secure Payment Gateway</h2>
      </header>

      <div className="payment-box">

        {/* LEFT SIDE PAYMENT OPTIONS */}
        <div className="left-side">
          <h3>Choose Payment Method</h3>

          <div
            className={`option ${method === "upi" ? "active" : ""}`}
            onClick={() => setMethod("upi")}
          >
            💧 UPI
          </div>

          <div
            className={`option ${method === "card" ? "active" : ""}`}
            onClick={() => setMethod("card")}
          >
            💳 Debit / Credit Card
          </div>

          <div
            className={`option ${method === "net" ? "active" : ""}`}
            onClick={() => setMethod("net")}
          >
            🏦 Net Banking
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="right-side">

          {/* PASSENGER + TRAIN SUMMARY */}
          <div className="details-box">
            <h3>Passenger Summary</h3>

            <p><b>Name:</b> {data.passengerName}</p>
            <p><b>Age:</b> {data.age}</p>
            <p><b>Gender:</b> {data.gender}</p>
            <p><b>Train:</b> {data.trainNo} – {data.trainName}</p>
            <p><b>Class:</b> {data.classType}</p>
          </div>

          {/* FARE SUMMARY */}
          <div className="fare-box">
            <h3>Fare Breakdown</h3>

            <p>Base Fare: ₹{data.baseFare}</p>
            <p>Reservation Fee: ₹{data.reservationFee}</p>
            <p>Convenience Fee: ₹{data.convFee}</p>
            <p>GST: ₹{data.gst}</p>

            <hr />
            <p className="total">
              <b>Total Payable: ₹{data.totalFare}</b>
            </p>
          </div>

          {/* Default Message */}
          {method === "" && <p className="msg">Select a payment method from left.</p>}

          {/* UPI SECTION */}
          {method === "upi" && (
            <div>
              <h3>UPI Apps</h3>

              <div className="upi-apps">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Google_Pay_Logo.svg"
                  alt="Google Pay"
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/f/f3/PhonePe_Logo.svg"
                  alt="PhonePe"
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/6/63/Paytm_Logo.jpg"
                  alt="Paytm"
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/8/89/BHIM_logo.svg"
                  alt="BHIM"
                />
              </div>

              <input className="input" placeholder="Enter UPI ID" />
              <button className="pay-btn">Pay ₹{data.totalFare}</button>
            </div>
          )}

          {/* CARD SECTION */}
          {method === "card" && (
            <div>
              <h3>Card Payment</h3>
              <input className="input" placeholder="Card Number" />
              <input className="input" placeholder="MM/YY" />
              <input className="input" placeholder="CVV" />
              <button className="pay-btn">Pay ₹{data.totalFare}</button>
            </div>
          )}

          {/* NET BANKING */}
          {method === "net" && (
            <div>
              <h3>Select Bank</h3>

              <div className="banks">
                <img 
                  src="https://1000logos.net/wp-content/uploads/2021/04/SBI-logo.png"
                  alt="SBI Bank"
                />
                <img 
                  src="https://companieslogo.com/img/orig/ICICIBANK.NS-5ab0cdfa.png"
                  alt="ICICI Bank"
                />
                <img 
                  src="https://companieslogo.com/img/orig/HDFCBANK.NS_BIG-8b8cbbf4.png"
                  alt="HDFC Bank"
                />
                <img 
                  src="https://companieslogo.com/img/orig/AXISBANK.NS-05c1b30d.png"
                  alt="Axis Bank"
                />
              </div>

              <select className="input">
                <option>SBI</option>
                <option>HDFC</option>
                <option>ICICI</option>
                <option>Axis Bank</option>
              </select>

              <button className="pay-btn">Pay ₹{data.totalFare}</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
