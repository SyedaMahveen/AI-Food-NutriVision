//frontend/src/componenets/FoodRecognition.jsx
import React, { useState } from "react";
import { detectFoodImage } from "../api/foodClient";

export default function FoodRecognition() {
  const [image, setImage] = useState(null);
  const [results, setResults] = useState([]);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImage(URL.createObjectURL(file));

    const response = await detectFoodImage(file);

    if (response.items) {
      setResults(response.items);
    } else {
      alert("Detection failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Food Recognition</h2>

      <input type="file" accept="image/*" onChange={handleUpload} />

      {image && (
        <div style={{ marginTop: 20 }}>
          <img src={image} alt="preview" width={300} />
        </div>
      )}

      <h3>Detected Items:</h3>
      <ul>
        {results.map((item, index) => (
          <li key={index}>
            {item.label} (confidence: {(item.confidence * 100).toFixed(1)}%)
          </li>
        ))}
      </ul>
    </div>
  );
}
