
//src/router.jsx
import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import FoodRecognition from "./pages/FoodRecognition";
import RecipeAnalyzer from "./pages/RecipeAnalyzer";
import GroceryAI from "./pages/GroceryAI";
import PortionEstimator from "./pages/PortionEstimator";
import Settings from "./pages/Settings";
import Register from "./pages/Register";
import Signup from "./pages/Signup";
import Login from "./pages/Login";


// Admin
import AdminDashboard from "./admin/AdminDashboard";
import ManageAlerts from "./admin/ManageAlerts";
import ManageFoodItems from "./admin/ManageFoodItems";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Main features */}
      <Route path="/food-recognition" element={<FoodRecognition />} />
      <Route path="/recipe-analyzer" element={<RecipeAnalyzer />} />
      <Route path="/grocery-ai" element={<GroceryAI />} />
      <Route path="/portion-estimator" element={<PortionEstimator />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/signup" element={<Signup />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/manage-alerts" element={<ManageAlerts />} />
      <Route path="/admin/manage-food-items" element={<ManageFoodItems />} />

      {/* Settings */}
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}