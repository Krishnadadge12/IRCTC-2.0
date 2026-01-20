import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>IRCTC 2.0</h2>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/trains">Train Management</Link></li>
        <li><Link to="/schedule">Schedule Management</Link></li>
        <li><Link to="/coach">Coach & Seat Management</Link></li>
        <li><Link to="/users">User Management</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
