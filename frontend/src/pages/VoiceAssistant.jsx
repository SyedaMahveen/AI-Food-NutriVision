//frontend/src/pages/VoiceAsssistant.jsx
import React, { useState, useEffect } from "react";
import voiceService from "../services/voiceService";

export default function VoiceAssistant() {
  const [recognizedText, setRecognizedText] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const recognizer = voiceService.initVoice();
    if (recognizer) setReady(true);
  }, []);

  const startVoiceRecognition = () => {
    voiceService.startListening((text) => {
      setRecognizedText(text);
    });
  };

  return (
    <div className="page">
      <h2>Voice Assistant</h2>

      {!ready && <p>Voice recognition not supported on this browser.</p>}

      {ready && (
        <button onClick={startVoiceRecognition} className="btn">
          🎤 Start Listening
        </button>
      )}

      {recognizedText && (
        <div className="result-box">
          <h3>You said:</h3>
          <p>{recognizedText}</p>
        </div>
      )}
    </div>
  );
}
