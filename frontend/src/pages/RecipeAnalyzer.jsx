//frontend/src/pages/RecipeAnalyzer.jsx
import React, { useState } from "react";

const API_BASE = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) || "http://localhost:8000";

export default function RecipeAnalyzer() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleAnalyze(e) {
    e.preventDefault();
    if (!text.trim()) {
      setError("Please enter recipe or ingredients");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch(`${API_BASE}/recipes/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.trim() })
      });
      
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message || "Failed to analyze recipe");
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h3 className="font-semibold text-lg">Recipe Analyzer</h3>
      <form onSubmit={handleAnalyze} className="mt-4 space-y-3">
        <textarea value={text} onChange={e=>setText(e.target.value)} rows={6} placeholder="Paste recipe text or ingredients" className="w-full border p-2 rounded" />
        <button className="px-4 py-2 bg-green-600 text-white rounded">Analyze</button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {loading && (
        <div className="mt-4 text-center text-gray-500">Analyzing recipe...</div>
      )}

      {result && !loading && (
        <div className="mt-6 space-y-6">
          {/* Nutrition Metrics */}
          <div className="grid grid-cols-4 gap-3 bg-blue-50 p-4 rounded">
            <div>
              <div className="font-semibold text-lg text-blue-700">{result.estimated_calories}</div>
              <div className="text-sm text-gray-600">Calories</div>
            </div>
            <div>
              <div className="font-semibold text-lg text-blue-700">{result.protein_g}g</div>
              <div className="text-sm text-gray-600">Protein</div>
            </div>
            <div>
              <div className="font-semibold text-lg text-blue-700">{result.carbs_g}g</div>
              <div className="text-sm text-gray-600">Carbs</div>
            </div>
            <div>
              <div className="font-semibold text-lg text-blue-700">{result.fat_g}g</div>
              <div className="text-sm text-gray-600">Fat</div>
            </div>
          </div>

          {/* Recipe Info */}
          <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded">
            <div>
              <span className="text-sm font-semibold text-gray-700">Cooking Time:</span>
              <span className="ml-2 text-lg font-semibold text-orange-600">{result.cooking_time_minutes} mins</span>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-700">Type:</span>
              <span className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${result.is_vegetarian ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {result.is_vegetarian ? '🌱 Vegetarian' : '🍗 Non-Vegetarian'}
              </span>
            </div>
          </div>

          {/* Detected Ingredients */}
          {result.ingredients_found && result.ingredients_found.length > 0 && (
            <div>
              <h4 className="font-semibold text-md mb-2">✓ Detected Ingredients:</h4>
              <div className="flex flex-wrap gap-2">
                {result.ingredients_found.map((ing, i) => (
                  <span key={i} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Healthy Alternatives */}
          {result.healthy_alternatives && result.healthy_alternatives.length > 0 && (
            <div>
              <h4 className="font-semibold text-md mb-2">⚠️ Healthier Alternatives:</h4>
              <div className="space-y-2">
                {result.healthy_alternatives.map((alt, i) => (
                  <div key={i} className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
                    <div className="flex justify-between items-start">
                      <span className="text-sm">
                        <span className="font-semibold text-gray-700 line-through">{alt.current}</span>
                        <span className="text-gray-600 mx-2">→</span>
                        <span className="font-semibold text-green-700">{alt.healthier}</span>
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{alt.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Missing Nutrition Info */}
          {result.missing_nutrition_info && result.missing_nutrition_info.length > 0 && (
            <div>
              <h4 className="font-semibold text-md mb-2">📋 Missing Nutrition Info:</h4>
              <ul className="space-y-1">
                {result.missing_nutrition_info.map((info, i) => (
                  <li key={i} className="flex items-start text-sm text-gray-700">
                    <span className="mr-2 text-orange-500">•</span>
                    <span>{info}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Suggestions */}
          {result.suggestions && result.suggestions.length > 0 && (
            <div>
              <h4 className="font-semibold text-md mb-2">💡 Suggestions:</h4>
              <ul className="ml-4 list-disc space-y-1">
                {result.suggestions.map((s, i) => (
                  <li key={i} className="text-sm text-gray-700">{s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
