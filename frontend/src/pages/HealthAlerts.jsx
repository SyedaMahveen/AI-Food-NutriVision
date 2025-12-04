//frontend/src/pages/HealthAlerts.jsx
import React, { useEffect, useState } from "react";
import { fetchAlerts } from "../services/dietService";
import AlertsIndicator from "../components/AlertsIndicator";

export default function HealthAlerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    const res = await fetchAlerts();
    setAlerts(res);
  };

  return (
    <div className="page">
      <h2>Health Alerts</h2>
      <AlertsIndicator alerts={alerts} />

      {alerts.map((a) => (
        <div key={a.id} className="alert-card">
          <strong>{a.type}</strong>
          <p>{a.message}</p>
        </div>
      ))}
    </div>
  );
}
