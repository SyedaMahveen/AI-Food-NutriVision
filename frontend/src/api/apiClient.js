//frontend/src/api/apiClient.js
const API_BASE = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) || "http://127.0.0.1:8000"; // FastAPI backend

// ---------- AUTH ----------

// SIGNUP
export async function signup(data) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || "Signup failed");
  }
  return res.json();
}

// LOGIN
export async function login(data) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || "Login failed");
  }
  return res.json();
}

// ---------- FOOD DETECTION ----------

export async function detectFood(imageFile) {
  const formData = new FormData();
  formData.append("file", imageFile);

  const res = await fetch(`${API_BASE}/food/detect`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Food detection failed");
  return res.json();   // { items: [...] }
}
