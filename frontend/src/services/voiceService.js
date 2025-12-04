// src/services/voiceService.js

let recognition = null;

export function initVoice() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.warn("Voice recognition not supported");
    return null;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;

  return recognition;
}

export function startListening(onResult) {
  if (!recognition) return;

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    onResult(text);
  };

  recognition.start();
}

export default {
  initVoice,
  startListening,
};
