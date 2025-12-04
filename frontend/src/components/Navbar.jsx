//frontend/src/components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path
      ? "bg-green-100 text-green-700 font-bold"
      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900";
  };

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl">🥗</span>
              <span className="font-bold text-xl text-gray-800 tracking-tight">NutriSense</span>
            </Link>
          </div>

          {/* Main Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/dashboard" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/dashboard')}`}>
              Dashboard
            </Link>
            <Link to="/recipe-analyzer" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/recipe-analyzer')}`}>
              Recipe Analyzer
            </Link>
            <Link to="/food-recognition" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/food-recognition')}`}>
              Food Recognition
            </Link>
            <Link to="/grocery-ai" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/grocery-ai')}`}>
              Grocery AI
            </Link>
            <Link to="/portion-estimator" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/portion-estimator')}`}>
              Portion Estimator
            </Link>
          </div>

          {/* Right Side - Settings & Auth */}
          <div className="flex items-center gap-3">
            <Link to="/settings" className={`p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors ${location.pathname === '/settings' ? 'text-green-600' : ''}`} title="Settings">
              ⚙️
            </Link>

            <div className="h-6 w-px bg-gray-300 mx-1"></div>

            <Link to="/login" className="text-gray-700 hover:text-green-600 font-medium text-sm px-3 py-2 transition-colors">
              Login
            </Link>
            <Link to="/signup" className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-full shadow-sm transition-all transform hover:scale-105">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
