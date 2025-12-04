//frontend/src/componenets/RecipeUpload.jsx
import React, { useRef, useState } from "react";
import recipeService from "../services/recipeService";

export default function RecipeUpload() {
  const fileRef = useRef();
  const [response, setResponse] = useState(null);

  const upload = async () => {
    const file = fileRef.current.files[0];
    if (!file) return alert("Upload a recipe image");

    const form = new FormData();
    form.append("file", file);

    const data = await recipeService.analyze(form);
    setResponse(data);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h3>Upload Recipe</h3>

      <input type="file" ref={fileRef} accept="image/*" />
      <button onClick={upload}>Analyze Recipe</button>

      {response && (
        <pre style={{ marginTop: "1rem", background: "#eee", padding: "1rem" }}>
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
}
