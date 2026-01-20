import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Dashboard() {
  // Hardcoded dynamic data
  const stats = {
    trains: 22,
    users: 1580,
    schedules: 48,
    coaches: 90,
    bookingsToday: 320
  };

  const recentActivity = [
    "Train 102 Shatabdi schedule updated",
    "User Priya Sharma account created",
    "Seat availability updated for 3A coach",
    "New train added: Pune – Bangalore Express",
    "Refund processed for Booking ID: 567836"
  ];

  return (
    <div className="container">
      <Sidebar />

      <div className="content">
        <Navbar />

        <h2>Dashboard Overview</h2>

        {/* STATS CARDS */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Trains</h3>
            <p>{stats.trains}</p>
          </div>

          <div className="stat-card">
            <h3>Total Users</h3>
            <p>{stats.users}</p>
          </div>

          <div className="stat-card">
            <h3>Schedules</h3>
            <p>{stats.schedules}</p>
          </div>

          <div className="stat-card">
            <h3>Total Coaches</h3>
            <p>{stats.coaches}</p>
          </div>

          <div className="stat-card">
            <h3>Today's Bookings</h3>
            <p>{stats.bookingsToday}</p>
          </div>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="card">
          <h3>Recent Activity</h3>
          <ul>
            {recentActivity.map((item, index) => (
              <li key={index} className="activity-item">{item}</li>
            ))}
          </ul>
        </div>

        {/* MINI GRAPH PLACEHOLDER */}
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
