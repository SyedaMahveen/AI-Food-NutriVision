//frontend/src/pages/PortionEstimator.jsx
import React, { useState } from "react";
import CameraCapture from "../components/CameraCapture";
import { estimatePortion } from "../services/foodService";

export default function PortionEstimator() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImage = async (blob) => {
    setLoading(true);
    setError(null);
    try {
      const res = await estimatePortion(blob);
      setData(res);
    } catch (err) {
      setError(err.message || "Failed to estimate portion");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="font-bold text-2xl mb-4">AI Portion Estimator</h2>

      <CameraCapture onCapture={handleImage} />

      {loading && <div className="mt-4 text-center text-gray-500">Analyzing portion size...</div>}

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {data && !loading && (
        <div className="mt-6 space-y-4">
          {/* Food Name & Confidence */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border-l-4 border-blue-500">
            <h3 className="font-bold text-2xl text-blue-900">{data.food_name || "Unknown Food"}</h3>
            {data.confidence && (
              <p className="text-sm text-blue-700 mt-1">
                Detection Confidence: <span className="font-semibold">{(data.confidence * 100).toFixed(0)}%</span>
              </p>
            )}
          </div>

          {/* Portion Size */}
          <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
            <h4 className="font-semibold text-lg text-orange-900 mb-2">📏 Estimated Portion Size</h4>
            <div className="text-3xl font-bold text-orange-600">{data.estimated_portion_grams}g</div>
            {data.estimated_portion_description && (
              <p className="text-sm text-orange-700 mt-2">{data.estimated_portion_description}</p>
            )}
          </div>

          {/* Nutrition Information */}
          <div className="grid grid-cols-4 gap-3 bg-blue-50 p-4 rounded">
            <div>
              <div className="font-semibold text-lg text-blue-700">{data.estimated_calories}</div>
              <div className="text-sm text-gray-600">Calories</div>
            </div>
            <div>
              <div className="font-semibold text-lg text-blue-700">{data.protein_g}g</div>
              <div className="text-sm text-gray-600">Protein</div>
            </div>
            <div>
              <div className="font-semibold text-lg text-blue-700">{data.carbs_g}g</div>
              <div className="text-sm text-gray-600">Carbs</div>
            </div>
            <div>
              <div className="font-semibold text-lg text-blue-700">{data.fat_g}g</div>
              <div className="text-sm text-gray-600">Fat</div>
            </div>
          </div>

          {/* Detection Method */}
          {data.detection_method && (
            <div className="text-xs text-gray-500 text-center pt-2">
              Detection method: {data.detection_method}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
