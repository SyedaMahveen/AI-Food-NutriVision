// src/utils/cameraUtils.js
export const getCameraPermission = async () => {
  try {
    await navigator.mediaDevices.getUserMedia({ video: true });
    return true;
  } catch {
    return false;
  }
};
