//frontend/src/pages/Dashboard.jsx
import React from "react";
import DietChart from "../components/DietChart";

export default function Dashboard() {
  // sample data; you will replace with real plan from backend
  const sample = [
    { label: "Breakfast", value: 350 },
    { label: "Lunch", value: 700 },
    { label: "Dinner", value: 600 },
    { label: "Snacks", value: 200 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DietChart data={sample} />
        <div className="bg-white p-4 rounded shadow">
          <h4 className="font-semibold">Quick Actions</h4>
          <ul className="mt-3 text-sm space-y-2">
            <li>• Scan food to get nutrition</li>
            <li>• Analyze recipe</li>
            <li>• Generate weekly diet plan</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
