//frontend/src/componenets/VoiceAssistant.jsx
import React, { useState } from "react";
import voiceService from "../services/voiceService";

export default function VoiceAssistant() {
  const [command, setCommand] = useState("");
  const [response, setResponse] = useState("");

  const ask = async () => {
    if (!command) return;
    const result = await voiceService.ask(command);
    setResponse(result.answer);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h3>Voice Assistant</h3>

      <input
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        placeholder="Ask something..."
      />

      <button onClick={ask} style={{ marginLeft: "1rem" }}>
        Ask
      </button>

      {response && (
        <p style={{ marginTop: "1rem", background: "#eee", padding: "1rem" }}>
          {response}
        </p>
      )}
    </div>
  );
}
