//frontend/src/admin/ManageFoodItems.jsx
import React, { useState } from "react";

export default function ManageFoodItems() {
  const [foods, setFoods] = useState([]);
  const [newFood, setNewFood] = useState("");

  const addFood = () => {
    if (!newFood) return;

    setFoods([...foods, newFood]);
    setNewFood("");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Manage Food Items</h2>

      <input
        type="text"
        value={newFood}
        placeholder="Add food item"
        onChange={(e) => setNewFood(e.target.value)}
      />

      <button onClick={addFood} style={{ marginLeft: "1rem" }}>
        Add
      </button>

      <ul style={{ marginTop: "1rem" }}>
        {foods.map((f, index) => (
          <li key={index}>{f}</li>
        ))}
      </ul>
    </div>
  );
}
