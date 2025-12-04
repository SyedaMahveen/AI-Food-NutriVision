//frontend/src/pages/Settings.jsx
import React, { useState } from "react";

export default function Settings() {
  const [profile, setProfile] = useState({
    age: "",
    weight: "",
    height: "",
    goal: "Weight Loss"
  });

  const [language, setLanguage] = useState("English");

  const handleSave = () => {
    // Save to localStorage for now (can be extended to API)
    localStorage.setItem("userProfile", JSON.stringify(profile));
    alert("Settings saved successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">⚙️ Settings</h1>

      {/* Language Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">🌐 Language</h2>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="German">German</option>
          <option value="Hindi">Hindi</option>
        </select>
      </div>

      {/* User Profile Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">👤 User Profile</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
            <input
              type="number"
              placeholder="Enter your age"
              value={profile.age}
              onChange={(e) => setProfile({ ...profile, age: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Weight (kg)</label>
            <input
              type="number"
              placeholder="Enter your weight"
              value={profile.weight}
              onChange={(e) => setProfile({ ...profile, weight: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Height (cm)</label>
            <input
              type="number"
              placeholder="Enter your height"
              value={profile.height}
              onChange={(e) => setProfile({ ...profile, height: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Fitness Goal</label>
            <select
              value={profile.goal}
              onChange={(e) => setProfile({ ...profile, goal: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="Weight Loss">Weight Loss</option>
              <option value="Muscle Gain">Muscle Gain</option>
              <option value="Maintain Weight">Maintain Weight</option>
              <option value="Diabetic Safe">Diabetic Safe</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-lg"
        >
          💾 Save Settings
        </button>
      </div>
    </div>
  );
}
