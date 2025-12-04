// src/context/AppContext.jsx
import { createContext, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  return (
    <AppContext.Provider value={{ loading, setLoading, toast, setToast }}>
      {children}
    </AppContext.Provider>
  );
}
