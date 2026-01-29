import React, { useState } from "react";

function SchedulePage() {
  const [schedules, setSchedules] = useState([
    { id: 1, arrival: "08:30", departure: "09:00", station: "Mumbai Central" },
    { id: 2, arrival: "12:15", departure: "12:45", station: "Pune Junction" },
    { id: 3, arrival: "17:20", departure: "17:40", station: "Delhi Station" }
  ]);

  // DELETE SCHEDULE
  const deleteSchedule = (id) => {
    setSchedules(schedules.filter((s) => s.id !== id));
  };

  // EDIT SCHEDULE
  const editSchedule = (id) => {
    const newArrival = prompt("Enter new Arrival Time:");
    const newDeparture = prompt("Enter new Departure Time:");
    const newStation = prompt("Enter new Station Name:");

    if (!newArrival || !newDeparture || !newStation) return;

    setSchedules(
      schedules.map((s) =>
        s.id === id
          ? {
              ...s,
              arrival: newArrival,
              departure: newDeparture,
              station: newStation,
            }
          : s
      )
    );
  };

  return (
    <div className="container">
      
      <div className="content">
        

        <div className="card">
          <h2>Schedule Management</h2>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Arrival Time</th>
                <th>Departure Time</th>
                <th>Station</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {schedules.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.arrival}</td>
                  <td>{s.departure}</td>
                  <td>{s.station}</td>
                  <td>
                    <button className="btn btn-primary" style={{margin: "5px"}} onClick={() => editSchedule(s.id)}>Edit</button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteSchedule(s.id)}
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

export default SchedulePage;