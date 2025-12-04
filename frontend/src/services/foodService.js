//frontend/src/services/foodService.js
const API = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) || "http://localhost:8000";

export const scanFoodImage = async (imageBlob) => {
  const form = new FormData();
  form.append("image", imageBlob);

  try {
    const res = await fetch(`${API}/food/detect`, {
      method: "POST",
      body: form,
    });

    return await res.json();
  } catch {
    return { error: "Image scan failed" };
  }
};

export const estimatePortion = async (imageFile) => {
  const form = new FormData();
  // Append the file with its original name for filename-based detection
  form.append("file", imageFile, imageFile.name || "image.jpg");

  try {
    const res = await fetch(`${API}/portion/estimate`, {
      method: "POST",
      body: form,
    });

    return await res.json();
  } catch {
    return { error: "Portion estimation failed" };
  }
};
