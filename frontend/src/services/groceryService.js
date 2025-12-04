// frontend/src/services/groceryService.js

// Use Vite environment variable `VITE_API_URL` (accessible as `import.meta.env.VITE_API_URL`).
// Fallback to localhost:8000 when not provided.
const API = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) || "http://localhost:8000";

/**
 * Generate a shopping list from a meal plan
 */
export const generateShoppingList = async (mealPlan) => {
  try {
    const res = await fetch(`${API}/grocery/shopping-list`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ meals: mealPlan }),
    });
    if (!res.ok) throw new Error("Failed to generate shopping list");
    return await res.json();
  } catch (err) {
    console.error("Shopping list error:", err);
    return { error: "Unable to generate shopping list", items: [] };
  }
};

/**
 * Get cost estimation for a shopping list
 */
export const estimateCost = async (items) => {
  try {
    const res = await fetch(`${API}/grocery/estimate-cost`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });
    if (!res.ok) throw new Error("Failed to estimate cost");
    return await res.json();
  } catch (err) {
    console.error("Cost estimation error:", err);
    return { error: "Unable to estimate cost", total: 0, breakdown: [] };
  }
};

/**
 * Get healthier alternatives and diet-optimized combinations
 */
export const getDietOptimizations = async (items, dietGoals) => {
  try {
    const res = await fetch(`${API}/grocery/optimize-diet`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items, dietGoals }),
    });
    if (!res.ok) throw new Error("Failed to get diet optimizations");
    return await res.json();
  } catch (err) {
    console.error("Diet optimization error:", err);
    return {
      error: "Unable to get optimizations",
      alternatives: [],
      recommendations: [],
    };
  }
};

/**
 * Suggest items based on a query
 */
export const suggestGroceryItems = async (query) => {
  try {
    const res = await fetch(`${API}/grocery/suggest?query=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error("Failed to get suggestions");
    return await res.json();
  } catch (err) {
    console.error("Suggestion error:", err);
    return { items: [] };
  }
};
