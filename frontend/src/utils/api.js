
// src/utils/api.js
export const API_BASE_URL = "http://127.0.0.1:8000";

// generic wrapper
export const apiRequest = async (endpoint, options = {}) => {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, options);
    return await res.json();
  } catch (err) {
    return { error: "Network error", details: err };
  }
};

// JSON POST
export const postJSON = (endpoint, data) =>
  apiRequest(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

// authenticated GET
export const authGet = (endpoint, token) =>
  apiRequest(endpoint, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

// image upload
export const uploadImage = async (endpoint, formData) =>
  apiRequest(endpoint, {
    method: "POST",
    body: formData
  });
