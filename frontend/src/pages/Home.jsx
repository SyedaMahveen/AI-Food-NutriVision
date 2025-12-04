//frontend/src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex flex-col justify-center">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
          The Ultimate <span className="text-green-600">AI Nutritionist</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Achieve your health goals with AI-powered food recognition, smart diet planning, and instant grocery analysis.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/food-recognition"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 text-lg"
          >
            📸 Scan Food
          </Link>
          <Link
            to="/recipe-analyzer"
            className="bg-white hover:bg-gray-50 text-gray-800 font-bold py-3 px-8 rounded-full shadow-lg border border-gray-200 transition-transform transform hover:scale-105 text-lg"
          >
            🍳 Analyze Recipe
          </Link>
        </div>
      </div>
    </div>
  );
}
