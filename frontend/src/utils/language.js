// src/utils/language.js

import { storage } from "./storage";

const LANGUAGE_KEY = "preferred_language";

export const languageUtils = {
  getCurrent() {
    return storage.get(LANGUAGE_KEY, "en");
  },

  setCurrent(langCode) {
    storage.set(LANGUAGE_KEY, langCode);
    return langCode;
  },

  isRTL(langCode) {
    return ["ur", "ar", "fa", "he"].includes(langCode); // if you ever add RTL languages
  },

  applyDirection(langCode) {
    if (languageUtils.isRTL(langCode)) {
      document.documentElement.dir = "rtl";
    } else {
      document.documentElement.dir = "ltr";
    }
  }
};
