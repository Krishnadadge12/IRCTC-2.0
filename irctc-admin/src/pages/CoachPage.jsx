import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function CoachPage() {
  const [coaches, setCoaches] = useState([
    { id: 1, type: "Sleeper (SL)", total: 72, available: 40 },
    { id: 2, type: "AC 3 Tier (3A)", total: 64, available: 20 },
    { id: 3, type: "AC 2 Tier (2A)", total: 48, available: 12 },
    { id: 4, type: "Second Seating (2S)", total: 108, available: 80 }
  ]);

  // DELETE coach
  const deleteCoach = (id) => {
    setCoaches(coaches.filter((c) => c.id !== id));
  };

  // EDIT coach
  const editCoach = (id) => {
    const updatedType = prompt("Enter new coach type:");
    const updatedTotal = prompt("Enter new total seats:");
    const updatedAvailable = prompt("Enter new available seats:");

    if (!updatedType || !updatedTotal || !updatedAvailable) return;

    setCoaches(
      coaches.map((c) =>
        c.id === id
          ? {
              ...c,
              type: updatedType,
              total: parseInt(updatedTotal),
              available: parseInt(updatedAvailable),
            }
          : c
      )
    );
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <Navbar />

        <div className="card">
          <h2>Coach & Seat Management</h2>

          <table>
            <thead>
              <tr>
                <th>Coach ID</th>
                <th>Coach Type</th>
                <th>Total Seats</th>
                <th>Available Seats</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {coaches.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.type}</td>
                  <td>{c.total}</td>
                  <td>{c.available}</td>
                  <td>
                    <button onClick={() => editCoach(c.id)}>Edit</button>
                    <button className="delete-btn" onClick={() => deleteCoach(c.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}

export default CoachPage;
