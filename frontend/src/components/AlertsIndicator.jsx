//frontend/src/componenets/AlertsIndicator.jsx
import React from "react";

export default function AlertsIndicator({ alerts = [] }) {
  return (
    <div style={{ padding: "1rem" }}>
      <h3>Health Alerts</h3>

      {alerts.length === 0 ? (
        <p>No alerts detected.</p>
      ) : (
        <ul>
          {alerts.map((a, index) => (
            <li key={index} style={{ color: a.level === "red" ? "red" : "orange" }}>
              {a.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
