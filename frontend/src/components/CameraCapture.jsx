//frontend/src/componenets/CameraCapture.jsx
import React, { useRef } from "react";

export default function CameraCapture({ onCapture }) {
  const fileRef = useRef();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Pass the actual File object instead of base64 DataURL
    onCapture(file);
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <input
        type="file"
        ref={fileRef}
        accept="image/*"
        onChange={handleImage}
      />
    </div>
  );
}
