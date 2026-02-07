// src/layout/AdminLayout.jsx
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      {/* Admin Sidebar / Navbar */}
      <Outlet />
    </div>
  );
};

export default AdminLayout;
