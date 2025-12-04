//frontend/src/componenets/.jsx
import React from "react";
import LANGUAGES from "../constants/language";

export default function LanguageSelector({ lang, setLang }) {
  return (
    <select value={lang} onChange={(e) => setLang(e.target.value)}>
      {Object.keys(LANGUAGES).map((l) => (
        <option key={l} value={l}>
          {LANGUAGES[l].label}
        </option>
      ))}
    </select>
  );
}
