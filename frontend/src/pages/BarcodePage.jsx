//frontend/src/pages/BarcodePage.js
import React from "react";
import { Link } from "react-router-dom";

export default function BarcodePage() {
  return (
    <div className="page">
      <h2>Barcode Scanner Removed</h2>
      <p>The barcode scanning feature has been removed from this application.</p>
      <p><Link to="/">Return to Home</Link></p>
    </div>
  );
}
