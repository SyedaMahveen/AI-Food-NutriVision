// src/utils/calcNutrition.js
// Basic nutrition calculator utility
// Helps compute calorie + macro totals for food items

/**
 * Calculate nutrition for a food item.
 * @param {Object} item - { calories, carbs, protein, fat, fiber }
 * @param {Number} quantity - portion multiplier (ex: 1.5 for 150g)
 */
export const calculateNutrition = (item, quantity = 1) => {
  if (!item) return null;

  const q = parseFloat(quantity) || 1;

  return {
    calories: +(item.calories * q).toFixed(2),
    carbs: +(item.carbs * q).toFixed(2),
    protein: +(item.protein * q).toFixed(2),
    fat: +(item.fat * q).toFixed(2),
    fiber: +(item.fiber * q).toFixed(2),
  };
};

/**
 * Sum nutrition across multiple items.
 * @param {Array} items - array of food nutrition objects
 */
export const sumNutrition = (items = []) => {
  return items.reduce(
    (tot, food) => ({
      calories: tot.calories + (food.calories || 0),
      carbs: tot.carbs + (food.carbs || 0),
      protein: tot.protein + (food.protein || 0),
      fat: tot.fat + (food.fat || 0),
      fiber: tot.fiber + (food.fiber || 0),
    }),
    { calories: 0, carbs: 0, protein: 0, fat: 0, fiber: 0 }
  );
};

/**
 * Convert per-100g nutrition → based on detected portion weight
 * @param {Object} item - nutrition per 100g
 * @param {Number} grams - portion weight from the AI estimator
 */
export const calculateFromPortion = (item, grams) => {
  if (!item || !grams) return null;

  const factor = grams / 100;

  return calculateNutrition(item, factor);
};
