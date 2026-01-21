import React from "react";
import "./TermsAndConditions.css";

function TermsAndConditions() {
  return (
    <div className="terms-bg">
      <div className="terms-overlay"></div>

      <div className="terms-container">
        <h1 className="terms-title">Terms & Conditions</h1>

        <p className="terms-intro">
          Please read the following terms and conditions carefully before booking
          a railway ticket through this platform.
        </p>

        <section className="terms-section">
          <h3>1. Ticket Booking</h3>
          <p>
            Ticket booking is subject to seat availability and successful
            payment. A booking is considered confirmed only after the payment
            process is completed and a confirmation is generated.
          </p>
        </section>

        <section className="terms-section">
          <h3>2. Passenger Details</h3>
          <p>
            Passengers must provide accurate personal details such as name, age,
            gender, phone number, and email address. Incorrect information may
            lead to cancellation without refund.
          </p>
        </section>

        <section className="terms-section">
          <h3>3. Payment & Charges</h3>
          <p>
            All payments are processed through secure payment gateways. The total
            fare includes base fare, reservation charges, convenience fees, and
            applicable taxes.
          </p>
        </section>

        <section className="terms-section">
          <h3>4. Cancellation & Refund</h3>
          <p>
            Ticket cancellation and refunds are governed by railway rules.
            Refunds, if applicable, will be processed to the original payment
            method within a stipulated time.
          </p>
        </section>

        <section className="terms-section">
          <h3>5. Journey & Travel</h3>
          <p>
            Passengers must carry a valid ticket and government-approved ID
            during the journey. Failure to do so may result in penalties.
          </p>
        </section>

        <section className="terms-section">
          <h3>6. System Limitations</h3>
          <p>
            This application is a project-based system. While efforts are made to
            ensure accuracy, the platform does not guarantee real-time railway
            data.
          </p>
        </section>

        <section className="terms-section">
          <h3>7. Acceptance of Terms</h3>
          <p>
            By proceeding with ticket booking, users agree to abide by all the
            above terms and conditions.
          </p>
        </section>

        <p className="terms-footer">
          © 2026 Railway Reservation System | All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default TermsAndConditions;
