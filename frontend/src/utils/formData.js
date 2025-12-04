// src/utils/formData.js
export const createFormData = (data) => {
  const form = new FormData();
  Object.keys(data).forEach((key) => form.append(key, data[key]));
  return form;
};
