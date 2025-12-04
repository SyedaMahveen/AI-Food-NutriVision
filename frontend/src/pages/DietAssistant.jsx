//frontend/src/pages/DietAssistant.jsx
import React, { useState } from "react";
import VoiceAssistant from "../components/VoiceAssistant";
import { getDietAdvice } from "../services/dietService";

export default function DietAssistant() {
  const [advice, setAdvice] = useState("");

  const handleVoiceInput = async (text) => {
    const res = await getDietAdvice(text);
    setAdvice(res.advice);
  };

  return (
    <div className="page">
      <h2>AI Diet Assistant</h2>
      <VoiceAssistant onSpeech={handleVoiceInput} />

      {advice && (
        <div className="advice-box">
          <h3>Your Nutrition Advice</h3>
          <p>{advice}</p>
        </div>
      )}
    </div>
  );
}
