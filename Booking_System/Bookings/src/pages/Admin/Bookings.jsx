import React from "react";
import "./Bookings.css";

function Dashboard() {

  /* ------------------ Recent Activity ------------------ */
  const recentActivity = [
    "Train 102 Shatabdi schedule updated",
    "User Priya Sharma account created",
    "Seat availability updated for 3A coach",
    "New train added: Pune – Bangalore Express",
    "Refund processed for Booking ID: 567836"
  ];

  /* ------------------ Bookings Data ------------------ */
  const bookings = [
    {
      id: 1001,
      passenger: "Rahul Verma",
      train: "Pune Express",
      date: "2026-01-28",
      seat: "A1-23",
      status: "Confirmed"
    },
    {
      id: 1002,
      passenger: "Neha Singh",
      train: "Shatabdi",
      date: "2026-01-29",
      seat: "B2-11",
      status: "Waiting"
    },
    {
      id: 1003,
      passenger: "Amit Patel",
      train: "Rajdhani",
      date: "2026-01-30",
      seat: "C1-07",
      status: "Confirmed"
    },
    {
      id: 1004,
      passenger: "Pooja Sharma",
      train: "Intercity",
      date: "2026-02-01",
      seat: "D3-19",
      status: "Cancelled"
    }
  ];

  return (
    <div className="container">

      <div className="content">
        {/* ================= BOOKINGS TABLE ================= */}
        <div className="card">
          <h3>Booking Details</h3>

          <table>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Passenger</th>
                <th>Train</th>
                <th>Date</th>
                <th>Seat</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.passenger}</td>
                  <td>{b.train}</td>
                  <td>{b.date}</td>
                  <td>{b.seat}</td>
                  <td>{b.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ================= RECENT ACTIVITY ================= */}
        <div className="card">
          <h3>Recent Activity</h3>
          <ul>
            {recentActivity.map((item, index) => (
              <li key={index} className="activity-item">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* ================= GRAPH ================= */}
        <div className="card">
          <h3>Booking Trend (Preview)</h3>
          <div className="graph-placeholder">
            <p>📊 Graph Coming Soon...</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
