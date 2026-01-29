import React, { useState } from 'react';
import './PNRStatus.css';

const PNRStatus = () => {
  const [pnrNumber, setPnrNumber] = useState('');
  const [statusData, setStatusData] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // Dummy PNR data with multiple passengers
  const dummyPNRData = {
    '1234567890': {
      pnrNumber: '1234567890',
      trainNumber: '12345',
      trainName: 'Express Train',
      from: 'Mumbai',
      to: 'Delhi',
      departureDate: '2026-02-15',
      reservationQuota: 'General',
      coachType: 'AC 3-Tier',
      status: 'Confirmed',
      bookingDate: '2026-01-28',
      passengers: [
        {
          fullName: 'John Doe',
          age: '35',
          sex: 'Male',
          berth: 'Lower',
          phone: '9876543210',
          email: 'john@example.com',
          seatNumber: '23A'
        },
        {
          fullName: 'Jane Doe',
          age: '32',
          sex: 'Female',
          berth: 'Middle',
          phone: '9876543211',
          email: 'jane@example.com',
          seatNumber: '23B'
        },
        {
          fullName: 'Alex Doe',
          age: '8',
          sex: 'Male',
          berth: 'Upper',
          phone: '9876543212',
          email: 'alex@example.com',
          seatNumber: '23C'
        }
      ]
    },
    '9876543210': {
      pnrNumber: '9876543210',
      trainNumber: '54321',
      trainName: 'Rajdhani Express',
      from: 'Bangalore',
      to: 'Chennai',
      departureDate: '2026-02-20',
      reservationQuota: 'Tatkal',
      coachType: 'AC 2-Tier',
      status: 'Confirmed',
      bookingDate: '2026-01-27',
      passengers: [
        {
          fullName: 'Jane Smith',
          age: '28',
          sex: 'Female',
          berth: 'Lower',
          phone: '8765432109',
          email: 'jane.smith@example.com',
          seatNumber: '15A'
        },
        {
          fullName: 'Emily Smith',
          age: '5',
          sex: 'Female',
          berth: 'Middle',
          phone: '8765432108',
          email: 'emily@example.com',
          seatNumber: '15B'
        }
      ]
    },
    '5555555555': {
      pnrNumber: '5555555555',
      trainNumber: '11111',
      trainName: 'Shatabdi Express',
      from: 'Pune',
      to: 'Mumbai',
      departureDate: '2026-02-10',
      reservationQuota: 'Senior',
      coachType: 'Chair Car',
      status: 'WaitListed (WL 3)',
      bookingDate: '2026-01-26',
      passengers: [
        {
          fullName: 'Raj Kumar',
          age: '65',
          sex: 'Male',
          berth: 'Lower',
          phone: '7654321098',
          email: 'raj.kumar@example.com',
          seatNumber: 'WL-3'
        }
      ]
    },
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!pnrNumber.trim()) {
      alert('Please enter a PNR number');
      return;
    }

    if (dummyPNRData[pnrNumber]) {
      setStatusData(dummyPNRData[pnrNumber]);
    } else {
      setStatusData(null);
      alert('PNR not found. Try: 1234567890, 9876543210, or 5555555555');
    }
    setSubmitted(true);
  };

  return (
    <div className="pnr-container">
      <div className="pnr-card">
        <h1 className="pnr-title">Check PNR Status</h1>
        <p className="pnr-subtitle">Enter your PNR number to check booking status and seat confirmation</p>

        <form onSubmit={handleSearch} className="pnr-form">
          <div className="pnr-form-group">
            <label htmlFor="pnr" className="pnr-label">
              PNR Number
            </label>
            <input
              type="text"
              id="pnr"
              className="pnr-input"
              placeholder="Enter 10-digit PNR number"
              value={pnrNumber}
              onChange={(e) => setPnrNumber(e.target.value)}
            />
          </div>
          <button type="submit" className="pnr-btn">
            Check Status
          </button>
        </form>

        {submitted && statusData && (
          <div className="pnr-result">
            <h2 className="pnr-result-title">Booking Details</h2>
            
            <div className="pnr-status-badge">
              <span className={`badge ${statusData.status.includes('Confirmed') ? 'confirmed' : 'waitlisted'}`}>
                {statusData.status}
              </span>
            </div>

            <div className="pnr-details-grid">
              <div className="pnr-detail-item">
                <label>PNR Number</label>
                <p>{statusData.pnrNumber}</p>
              </div>

              <div className="pnr-detail-item">
                <label>Train Name</label>
                <p>{statusData.trainName}</p>
              </div>

              <div className="pnr-detail-item">
                <label>Train Number</label>
                <p>{statusData.trainNumber}</p>
              </div>

              <div className="pnr-detail-item">
                <label>From</label>
                <p>{statusData.from}</p>
              </div>

              <div className="pnr-detail-item">
                <label>To</label>
                <p>{statusData.to}</p>
              </div>

              <div className="pnr-detail-item">
                <label>Departure Date</label>
                <p>{statusData.departureDate}</p>
              </div>

              <div className="pnr-detail-item">
                <label>Reservation Quota</label>
                <p>{statusData.reservationQuota}</p>
              </div>

              <div className="pnr-detail-item">
                <label>Coach Type</label>
                <p>{statusData.coachType}</p>
              </div>

              <div className="pnr-detail-item">
                <label>Booking Date</label>
                <p>{statusData.bookingDate}</p>
              </div>
            </div>

            {/* Passengers Section */}
            <div className="pnr-passengers-section">
              <h3 className="pnr-passengers-title">Passengers ({statusData.passengers.length})</h3>
              
              <div className="pnr-passengers-list">
                {statusData.passengers.map((passenger, idx) => (
                  <div key={idx} className="passenger-card">
                    <h4 className="passenger-card-title">Passenger {idx + 1}</h4>
                    
                    <div className="passenger-details-grid">
                      <div className="passenger-detail">
                        <label>Full Name</label>
                        <p>{passenger.fullName}</p>
                      </div>

                      <div className="passenger-detail">
                        <label>Age</label>
                        <p>{passenger.age}</p>
                      </div>

                      <div className="passenger-detail">
                        <label>Sex</label>
                        <p>{passenger.sex}</p>
                      </div>

                      <div className="passenger-detail">
                        <label>Berth Preference</label>
                        <p>{passenger.berth}</p>
                      </div>

                      <div className="passenger-detail">
                        <label>Phone Number</label>
                        <p>{passenger.phone}</p>
                      </div>

                      <div className="passenger-detail">
                        <label>Email</label>
                        <p>{passenger.email}</p>
                      </div>

                      <div className="passenger-detail">
                        <label>Seat Number</label>
                        <p className="seat-badge">{passenger.seatNumber}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {submitted && !statusData && (
          <div className="pnr-error">
            <p>No booking found for PNR: {pnrNumber}</p>
            <p className="pnr-error-hint">Please try one of the sample PNR numbers: 1234567890, 9876543210, or 5555555555</p>
          </div>
        )}

        <div className="pnr-help-section">
          <h3>Sample PNR Numbers to Try:</h3>
          <ul>
            <li>1234567890 - John Doe (Confirmed)</li>
            <li>9876543210 - Jane Smith (Confirmed)</li>
            <li>5555555555 - Raj Kumar (WaitListed)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PNRStatus;
