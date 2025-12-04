//frontend/src/componenets/MealCompare.jsx
import React from "react";

export default function MealCompare({ meals }) {
  if (!meals || meals.length === 0) {
    return <p>No meals to compare.</p>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h3>Meal Comparison</h3>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "1rem"
        }}
      >
        <thead>
          <tr>
            <th style={cellStyle}>Meal</th>
            <th style={cellStyle}>Calories</th>
            <th style={cellStyle}>Protein (g)</th>
            <th style={cellStyle}>Carbs (g)</th>
            <th style={cellStyle}>Fats (g)</th>
          </tr>
        </thead>

        <tbody>
          {meals.map((meal, index) => (
            <tr key={index}>
              <td style={cellStyle}>{meal.name || "Unknown Meal"}</td>
              <td style={cellStyle}>{meal.calories || "--"}</td>
              <td style={cellStyle}>{meal.protein || "--"}</td>
              <td style={cellStyle}>{meal.carbs || "--"}</td>
              <td style={cellStyle}>{meal.fat || "--"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const cellStyle = {
  border: "1px solid #ccc",
  padding: "8px",
  textAlign: "center"
};
