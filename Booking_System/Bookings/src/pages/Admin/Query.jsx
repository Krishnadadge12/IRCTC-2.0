import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { getAllQueries, updateQueryStatus, resolveQuery } from "../../services/adminQuery";
import "./AdminHome.css";

function QueryPage() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const STATUSES = ["PENDING", "RESOLVED"];

  useEffect(() => {
    fetchQueries();
  }, []);

  async function fetchQueries() {
    setLoading(true);
    setError("");
    try {
      const data = await getAllQueries();
      // Map server DTO to UI-friendly fields
      const mapped = data.map((q) => ({
        // backend QueryResponseDto uses field `queryId`
        id: q.queryId || q.q_id || q.qId || q.id || q._id,
        email: q.email || "-",
        message: q.message || "-",
        status: (q.status || q.queryStatus || "PENDING").toString()
      }));
      setQueries(mapped);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || err?.message || "Unable to fetch queries");
    } finally {
      setLoading(false);
    }
  }

  const handleStatusChange = async (id, newStatus) => {
    // Only RESOLVED is supported by backend (/resolve). If newStatus === 'PENDING' we can't persist it.
    let prevStatus;
    setQueries((prev) => prev.map((q) => {
      if (q.id === id) { prevStatus = q.status; return { ...q, status: newStatus }; }
      return q;
    }));

    setUpdatingId(id);
    try {
      if (newStatus === "RESOLVED") {
        const updated = await resolveQuery(id);
        const updatedStatus = updated?.status || updated?.queryStatus || newStatus;
        setQueries((prev) => prev.map((q) => (q.id === id ? { ...q, status: updatedStatus } : q)));
      } else if (newStatus === "PENDING") {
        // Backend has no 're-open' endpoint; rollback and inform user
        setQueries((prev) => prev.map((q) => (q.id === id ? { ...q, status: prevStatus } : q)));
        alert("Cannot set status back to PENDING: backend does not provide an endpoint to reopen queries.");
      } else {
        // Fallback to generic update endpoint if available
        try {
          const updated = await updateQueryStatus(id, newStatus);
          const updatedStatus = updated?.status || updated?.queryStatus || newStatus;
          setQueries((prev) => prev.map((q) => (q.id === id ? { ...q, status: updatedStatus } : q)));
        } catch (err) {
          // rollback on failure
          setQueries((prev) => prev.map((q) => (q.id === id ? { ...q, status: prevStatus } : q)));
          alert(err?.response?.data?.message || err?.message || "Unable to update query status");
        }
      }
    } catch (err) {
      console.error(err);
      // rollback
      setQueries((prev) => prev.map((q) => (q.id === id ? { ...q, status: prevStatus } : q)));
      alert(err?.response?.data?.message || err?.message || "Unable to update query status");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="container">
      <div className="admin-home">
        <div className="navbar-logo-section">
          <div className='navbar-logo-link' to={'/home'}>
            <img 
              src="/images/MRC.png"
              alt="MRC Logo" 
              className="navbar-logo-img"
            />
          </div>
        </div>

        <h1>Query Management</h1>
        <div style={{ marginBottom: 12 }}>
          <Link to="/admin/home" className="admin-link">← Back to Admin Home</Link>
        </div>

        {loading && <p>Loading queries...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {queries && queries.length > 0 && (
          <div className="bookings-results">
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {queries.map((q) => (
                  <tr key={q.id}>
                    <td>{q.id}</td>
                    <td>{q.email}</td>
                    <td>{q.message}</td>
                    <td>
                      <select
                        value={q.status}
                        disabled={updatingId === q.id}
                        onChange={(e) => handleStatusChange(q.id, e.target.value)}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {updatingId === q.id && <span style={{ marginLeft: 8 }}>Updating...</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}

export default QueryPage;