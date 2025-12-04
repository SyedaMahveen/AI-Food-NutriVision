// src/context/UserContext.jsx
import { createContext, useState } from "react";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [profile, setProfile] = useState({
    age: null,
    weight: null,
    height: null,
    allergies: [],
    dietGoal: "",
    language: "en",
  });

  return (
    <UserContext.Provider value={{ profile, setProfile }}>
      {children}
    </UserContext.Provider>
  );
}
