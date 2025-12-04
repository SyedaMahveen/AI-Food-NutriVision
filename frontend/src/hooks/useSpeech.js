//frontend/src/hooks/useSpeech.js
import { useState } from "react";

export default function useSpeech() {
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);

  let recognition;

  if ("webkitSpeechRecognition" in window) {
    recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
  }

  const start = () => {
    if (recognition) {
      setListening(true);
      recognition.start();
    }
  };

  return { text, listening, start };
}
