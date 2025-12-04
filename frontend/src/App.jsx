//src/App.jsx
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <AppRouter />
      </div>
    </BrowserRouter>
  );
}
