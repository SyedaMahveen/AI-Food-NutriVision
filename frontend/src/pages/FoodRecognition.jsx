//frontend/src/pages/FoodRecognition.jsx
import { useState } from "react";

export default function FoodRecognition() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:8000/food/detect", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Upload error:", error);
    }

    setLoading(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-3">Food Image Recognition</h2>

      <input
        type="file"
        className="border p-2"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-green-600 text-white rounded mt-2"
        disabled={loading}
      >
        {loading ? "Detecting..." : "Upload & Detect"}
      </button>

      <div className="mt-4 text-lg">
        {result ? (
          <>
            <p><b>Food:</b> {result.analysis.food}</p>
            <p><b>Calories:</b> {result.analysis.estimated_calories}</p>
            <p><b>Protein:</b> {result.analysis.protein_g}g</p>
            <p><b>Carbs:</b> {result.analysis.carbs_g}g</p>
            <p><b>Fat:</b> {result.analysis.fat_g}g</p>
          </>
        ) : (
          <div className="text-sm text-gray-500">No detection result yet</div>
        )}
      </div>
    </div>
  );
}
