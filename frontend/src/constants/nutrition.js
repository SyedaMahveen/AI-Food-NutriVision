//frontend/src/constants/nutrition.js
export const NUTRIENT_LIMITS = {
  sugar: { max: 25 }, // grams/day
  sodium: { max: 2000 },
  fat: { max: 70 },
  protein_min: { min: 50 },
  fibre_min: { min: 25 },
};

export const CONDITIONS = {
  diabetes: ["sugar", "carbs"],
  bp: ["sodium"],
  cholesterol: ["trans_fat", "fat"],
};

export const DEFAULT_GOALS = {
  weight_loss: { calories: 1500 },
  muscle_gain: { calories: 2500 },
  diabetic_safe: { calories: 1800 },
};
