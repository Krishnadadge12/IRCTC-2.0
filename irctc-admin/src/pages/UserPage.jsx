import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function UserPage() {
  const [users, setUsers] = useState([
    { id: 1, name: "Johnson", email: "johnson@gmail.com", status: "Active" },
    { id: 2, name: "Priya Sharma", email: "priya@gmail.com", status: "Active" },
    { id: 3, name: "Ravi Kumar", email: "ravi@gmail.com", status: "Blocked" }
  ]);

  // DELETE USER
  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  // EDIT USER
  const editUser = (id) => {
    const newName = prompt("Enter new name:");
    const newEmail = prompt("Enter new email:");
    const newStatus = prompt("Enter user status (Active / Blocked):");

    if (!newName || !newEmail || !newStatus) return;

    setUsers(
      users.map((u) =>
        u.id === id
          ? { ...u, name: newName, email: newEmail, status: newStatus }
          : u
      )
    );
  };

  // BLOCK USER
  const blockUser = (id) => {
    setUsers(
      users.map((u) =>
        u.id === id ? { ...u, status: "Blocked" } : u
      )
    );
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <Navbar />

        <div className="card">
          <h2>User Management</h2>

          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <span
                      style={{
                        color: u.status === "Active" ? "green" : "red",
                        fontWeight: "600"
                      }}
                    >
                      {u.status}
                    </span>
                  </td>

                  <td>
                    <button onClick={() => editUser(u.id)}>Edit</button>
                    <button className="delete-btn" onClick={() => deleteUser(u.id)}>
                      Delete
                    </button>

                    {u.status === "Active" && (
                      <button
                        style={{ background: "#e67e22" }}
                        onClick={() => blockUser(u.id)}
                      >
                        Block
                      </button>
                    )}
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
