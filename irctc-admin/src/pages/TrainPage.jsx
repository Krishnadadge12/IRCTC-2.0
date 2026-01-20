import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function TrainPage() {
  const [trains, setTrains] = useState([
    { id: 102, name: "Shatabdi", source: "Pune", dest: "Chennai" }
  ]);

  const deleteTrain = (id) => {
    setTrains(trains.filter((t) => t.id !== id));
  };

  const editTrain = (id) => {
    const newName = prompt("Enter new train name");
    if (newName) {
      setTrains(
        trains.map((t) =>
          t.id === id ? { ...t, name: newName } : t
        )
      );
    }
  };

  return (
    <div className="container">
      <Sidebar />

      <div className="content">
        <Navbar />

        <div className="card">
          <h2>Train Management</h2>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {trains.map((t) => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.name}</td>
                  <td>{t.source}</td>
                  <td>{t.dest}</td>
                  <td>
                    <button onClick={() => editTrain(t.id)}>Edit</button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteTrain(t.id)}
                    >
                      Delete
                    </button>
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

export default TrainPage;
