//frontend/src/services/recipeService.js
import { API } from "../utils/api";

// Analyze recipe text and return nutrition + ingredients
export const analyzeRecipe = async (text) => {
  try {
    const res = await fetch(`${API}/recipe/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    return await res.json();
  } catch (err) {
    console.error("Recipe analysis failed:", err);
    return { error: "Recipe analysis failed" };
  }
};

// Get nutrition details of a specific ingredient
export const getIngredientNutrition = async (ingredient) => {
  try {
    const res = await fetch(`${API}/recipe/ingredient`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredient }),
    });

    return await res.json();
  } catch (err) {
    console.error("Ingredient nutrition failed:", err);
    return { error: "Ingredient nutrition failed" };
  }
};
