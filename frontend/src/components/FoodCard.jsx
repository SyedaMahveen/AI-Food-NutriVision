//frontend/src/componenets/FoodCard.jsx
import React from "react";

export default function FoodCard({ item }) {
  if (!item) return null;

  return (
    <div className="p-4 border rounded-lg shadow bg-white">
      <h3 className="font-bold text-lg capitalize">{item.label}</h3>

      <p className="text-sm text-gray-700">
        Confidence: {Math.round(item.confidence * 100)}%
      </p>

      {/* Optional bounding box viewer */}
      {item.bbox && (
        <div className="mt-2 text-xs text-gray-500">
          BBOX: [{item.bbox.join(", ")}]
        </div>
      )}
    </div>
  );
}
