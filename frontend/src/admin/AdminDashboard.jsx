//frontend/src/admin/AdminDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <ul>
        <li>
          <Link to="/admin/manage-alerts">Manage Alerts</Link>
        </li>
        <li>
          <Link to="/admin/manage-food-items">Manage Food Items</Link>
        </li>
      </ul>
    </div>
  );
}

