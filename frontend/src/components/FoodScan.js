//frontend/src/componenets/FoodScan.jsx
import { scanFoodImage } from "../api/foodClient";

async function handleScan() {
  const result = await scanFoodImage(selectedImage);
  console.log("SCAN RESULT:", result);
  setDetectedItems(result.items);
}
