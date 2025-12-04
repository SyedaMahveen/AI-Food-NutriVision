//frontend/src/api/foodClient.js
const API = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) || "http://127.0.0.1:8000";

export const detectFoodImage = async (imageBlob) => {
  const form = new FormData();
  form.append("file", imageBlob);   // MUST be "file"

  try {
    const res = await fetch(`${API}/food/detect`, {
      method: "POST",
      body: form,
    });

    return await res.json();
  } catch (err) {
    console.error(err);
    return { error: "Food detection failed" };
  }
};
