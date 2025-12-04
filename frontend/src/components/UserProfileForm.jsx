//frontend/src/componenets/UserProfileForm.jsx
import React, { useState } from "react";

export default function UserProfileForm({ onSave }) {
  const [form, setForm] = useState({
    age: "",
    weight: "",
    height: "",
    goal: "weight_loss",
  });

  const update = (k, v) => setForm({ ...form, [k]: v });

  return (
    <div style={{ padding: "1rem" }}>
      <h3>User Profile</h3>

      <input
        placeholder="Age"
        value={form.age}
        onChange={(e) => update("age", e.target.value)}
      />
      <br />

      <input
        placeholder="Weight (kg)"
        value={form.weight}
        onChange={(e) => update("weight", e.target.value)}
      />
      <br />

      <input
        placeholder="Height (cm)"
        value={form.height}
        onChange={(e) => update("height", e.target.value)}
      />
      <br />

      <select
        value={form.goal}
        onChange={(e) => update("goal", e.target.value)}
      >
        <option value="weight_loss">Weight Loss</option>
        <option value="muscle_gain">Muscle Gain</option>
        <option value="diabetic_safe">Diabetic Safe</option>
      </select>

      <br />

      <button onClick={() => onSave(form)}>Save</button>
    </div>
  );
}
