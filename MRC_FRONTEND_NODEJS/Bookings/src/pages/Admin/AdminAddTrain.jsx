import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addTrain } from "../../services/adminTrain"; // create this service
import "./AdminBookings.css";
function AddTrain() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    trainNumber: "",
    trainName: "",
    source: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
    scheduleDate: "",
    trainStatus: "SCHEDULED"
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await addTrain(formData);
      alert("Train added successfully!");
      navigate("/admin/trains"); // go back to train page
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || err.message || "Error adding train");
    }
  };

  return (
    <div className="container-addTrain">
      <h2>Add New Train</h2>
      <button className="back-btn" onClick={() => navigate("/admin/trains")}>
      ← Back
    </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Train Number</label>
          <input type="number" name="trainNumber" value={formData.trainNumber} onChange={handleChange} required />
        </div>
        <div>
          <label>Train Name</label>
          <input type="text" name="trainName" value={formData.trainName} onChange={handleChange} required />
        </div>
        <div>
          <label>Source</label>
          <input type="text" name="source" value={formData.source} onChange={handleChange} required />
        </div>
        <div>
          <label>Destination</label>
          <input type="text" name="destination" value={formData.destination} onChange={handleChange} required />
        </div>
        <div>
          <label>Departure Time</label>
          <input type="time" name="departureTime" value={formData.departureTime} onChange={handleChange} required />
        </div>
        <div>
          <label>Arrival Time</label>
          <input type="time" name="arrivalTime" value={formData.arrivalTime} onChange={handleChange} required />
        </div>
        <div>
          <label>Schedule Date</label>
          <input type="date" name="scheduleDate" value={formData.scheduleDate} onChange={handleChange} required />
        </div>
        <div>
          <label>Status</label>
          <input type="text" name="trainStatus" value={formData.trainStatus} onChange={handleChange} required />
          
        </div>
        <button type="submit">Add Train</button>
      </form>
    </div>
  );
}

export default AddTrain;