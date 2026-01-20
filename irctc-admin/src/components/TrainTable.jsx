import React, { useState } from "react";

function TrainManagement() {
  const [trains, setTrains] = useState([]);

  const loadTrains = () => {
    setTrains([
      { id: 101, name: "Express", source: "Mumbai", dest: "Delhi" },
      { id: 102, name: "Shatabdi", source: "Pune", dest: "Chennai" }
    ]);
  };

  return (
    <div className="card">
      <h3>Train Management</h3>

      <button onClick={loadTrains}>Load Trains</button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Source</th>
            <th>Destination</th>
          </tr>
        </thead>

        <tbody>
          {trains.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.name}</td>
              <td>{t.source}</td>
              <td>{t.dest}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TrainManagement;
