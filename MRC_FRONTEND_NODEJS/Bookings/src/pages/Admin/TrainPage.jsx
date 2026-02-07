import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./AdminBookings.css";
import { getAllAdminTrains, updateTrainStatus } from "../../services/adminTrain";
import { useNavigate } from "react-router-dom";

function TrainPage() {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrains();
  }, []);

  async function fetchTrains() {
    setLoading(true);
    setError("");
    try {
      const data = await getAllAdminTrains();
      // Map common fields from backend DTO to frontend-friendly keys
      const mapped = data.map((t) => ({
        id: t.trainId,
        name: t.name || t.trainName || t.trainNo || t.number,
        source: t.source || t.from || t.startStation,
        dest: t.destination || t.to || t.destinationStation,
        status: t.trainStatus || t.status || "SCHEDULED"
      }));
      setTrains(mapped);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || err.message || "Unable to fetch trains");
    } finally {
      setLoading(false);
    }
  }

  const deleteTrain = (id) => {
    setTrains(trains.filter((t) => t.id !== id));
  };

  // Allowed statuses for admin to select
  const STATUSES = ["SCHEDULED", "CANCELLED", "COMPLETED"];
  const [updatingId, setUpdatingId] = useState(null);

  const handleStatusChange = async (id, newStatus) => {
    // Use functional update to avoid stale closures and ensure we capture the
    // previous status of only the targeted train for rollback.
    let prevStatus;
    setTrains((prev) => prev.map((t) => {
      if (t.id === id) {
        prevStatus = t.status;
        return { ...t, status: newStatus };
      }
      return t;
    }));

    setUpdatingId(id);
    try {
      const updated = await updateTrainStatus(id, newStatus);
      // Only update the status field for the targeted train (do NOT change other fields)
      const updatedStatus = updated?.trainStatus || updated?.status || newStatus;
      setTrains((prev) => prev.map((t) => (t.id === id ? { ...t, status: updatedStatus } : t)));
    } catch (err) {
      console.error(err);
      // rollback only the targeted train
      setTrains((prev) => prev.map((t) => (t.id === id ? { ...t, status: prevStatus } : t)));
      alert(err?.response?.data?.message || err.message || "Unable to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="container">
      <div className="content">
        <div className="card">
          <h2>Train Management</h2>
          <div style={{ marginBottom: 12 }}>
            <Link to="/admin/home" className="admin-link">← Back to Admin Home</Link>
          </div>
          <button
            className="add-train-btn"
            onClick={() => navigate("/admin/trains/add")}
        >Add New Train</button>

          {loading && <p>Loading trains...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Status</th>
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
                    <select
                      value={t.status}
                      disabled={updatingId === t.id}
                      onChange={(e) => handleStatusChange(t.id, e.target.value)}
                    >
                      {/* If current status isn't part of allowed list, keep it selectable */}
                      {!STATUSES.includes(t.status) && (
                        <option key={t.status} value={t.status}>{t.status}</option>
                      )}
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {updatingId === t.id && <span style={{ marginLeft: "8px" }}>Updating...</span>}
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