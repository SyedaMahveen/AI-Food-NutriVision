//frontend/src/componenets/DietChart.jsx
import React from "react";

export default function DietChart({ data = [] }) {
  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h4 className="font-semibold mb-2">Daily calories (sample)</h4>
      <div className="space-y-2">
        {data.length === 0 ? (
          <div className="text-sm text-gray-500">No data yet</div>
        ) : data.map((d, i) => (
          <div key={i} className="flex items-center">
            <div className="w-32 text-sm">{d.label}</div>
            <div className="h-4 bg-green-300 rounded" style={{ width: `${Math.min(100, d.value)}%` }} />
            <div className="ml-2 text-sm">{d.value} kcal</div>
          </div>
        ))}
      </div>
    </div>
  );
}
