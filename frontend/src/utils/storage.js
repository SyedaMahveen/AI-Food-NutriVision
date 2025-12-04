// src/utils/storage.js
// Safe localStorage helper functions

export const storage = {
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("Storage set error:", err);
    }
  },

  get(key, defaultValue = null) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch (err) {
      console.error("Storage get error:", err);
      return defaultValue;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error("Storage remove error:", err);
    }
  },

  clear() {
    try {
      localStorage.clear();
    } catch (err) {
      console.error("Storage clear error:", err);
    }
  }
};
