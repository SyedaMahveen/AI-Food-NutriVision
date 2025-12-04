//frontend/src/pages/FoodDetection.jsx
import { detectFood } from "../api/foodClient";

async function handleUpload() {
  const result = await detectFood(selectedFile);
  console.log("DETECTED ITEMS:", result.items);
  setDetectedItems(result.items);
}
