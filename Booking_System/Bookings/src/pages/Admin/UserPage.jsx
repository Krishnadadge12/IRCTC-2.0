import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { getAllAdminUsers, blockUser as apiBlockUser, unblockUser as apiUnblockUser } from "../../services/adminUser";

function UserPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    setError("");
    try {
        const data = await getAllAdminUsers();
      // Map DTO fields to UI based on UserEntity
      const mapped = data.map((u) => ({
        id: u.userId,
        firstName: u.firstName || "",
        lastName: u.lastName || "",
        dob: u.dob || "",
        email: u.email || "",
        phone: u.phone || "",
        gender: u.gender || "",
        idProof: u.idProof || "",
        status: (u.userStatus || u.status || "ACTIVE").toString()
      }));
      setUsers(mapped);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || err?.message || "Unable to fetch users");
    } finally {
      setLoading(false);
    }
  }

  const handleStatusChange = async (id, newStatus) => {
    // capture prevStatus for rollback
    let prevStatus;
    setUsers((prev) => prev.map((u) => {
      if (u.id === id) { prevStatus = u.status; return { ...u, status: newStatus }; }
      return u;
    }));

    setUpdatingId(id);
    try {
      if (newStatus === "BLOCKED") {
        await apiBlockUser(id);
      } else if (newStatus === "ACTIVE") {
        await apiUnblockUser(id);
      }
      // only status already updated optimistically; server accepted - nothing else to do
    } catch (err) {
      console.error(err);
      // rollback
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status: prevStatus } : u)));
      alert(err?.response?.data?.message || err?.message || "Unable to update user status");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="container">
      <div className="content">
        <div className="card">
          <h2>User Management</h2>
          <div style={{ marginBottom: 12 }}>
            <Link to="/admin/home" className="admin-link">← Back to Admin Home</Link>
          </div>

          {loading && <p>Loading users...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>DOB</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>ID Proof</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.firstName || "-"}</td>
                  <td>{u.lastName || "-"}</td>
                  <td>{u.dob ? new Date(u.dob).toLocaleDateString() : "-"}</td>
                  <td>{u.email || "-"}</td>
                  <td>{u.phone || "-"}</td>
                  <td>{u.gender || "-"}</td>
                  <td>{u.idProof || "-"}</td>
                  <td>
                    <select
                      value={u.status}
                      disabled={updatingId === u.id}
                      onChange={(e) => handleStatusChange(u.id, e.target.value)}
                    >
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="BLOCKED">BLOCKED</option>
                    </select>
                    {updatingId === u.id && <span style={{ marginLeft: "8px" }}>Updating...</span>}
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

export default UserPage;