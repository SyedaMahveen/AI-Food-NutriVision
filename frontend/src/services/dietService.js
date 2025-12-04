//frontend/src/services/dietService.js
const API = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) || "http://localhost:8000";

export const getDietAdvice = async (query) => {
  try {
    const res = await fetch(`${API}/diet/advice`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    return await res.json();
  } catch {
    return { advice: "Unable to fetch diet advice right now." };
  }
};

export const fetchAlerts = async () => {
  try {
    const res = await fetch(`${API}/diet/alerts`);
    return await res.json();
  } catch {
    return [];
  }
};
