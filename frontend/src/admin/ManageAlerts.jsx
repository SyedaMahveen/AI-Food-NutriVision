//frontend/src/admin/ManageAlerts.jsx
import React, { useState } from "react";

export default function ManageAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [newAlert, setNewAlert] = useState("");

  const addAlert = () => {
    if (!newAlert) return;

    setAlerts([...alerts, { message: newAlert, level: "yellow" }]);
    setNewAlert("");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Manage Health Alerts</h2>

      <input
        type="text"
        value={newAlert}
        placeholder="Enter alert message"
        onChange={(e) => setNewAlert(e.target.value)}
      />

      <button onClick={addAlert} style={{ marginLeft: "1rem" }}>
        Add Alert
      </button>

      <ul style={{ marginTop: "1rem" }}>
        {alerts.map((a, i) => (
          <li key={i}>{a.message}</li>
        ))}
      </ul>
    </div>
  );
}
