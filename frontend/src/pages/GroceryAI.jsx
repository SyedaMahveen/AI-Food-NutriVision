//frontend/src/pages/GroceryAI.jsx
import React, { useState } from "react";
import {
  generateShoppingList,
  estimateCost,
  getDietOptimizations,
  suggestGroceryItems,
} from "../services/groceryService";

export default function GroceryAI() {
  const [activeTab, setActiveTab] = useState("shopping-list");
  const [mealInput, setMealInput] = useState("");
  const [shoppingList, setShoppingList] = useState([]);
  const [costEstimate, setCostEstimate] = useState(null);
  const [dietOptimizations, setDietOptimizations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dietGoals, setDietGoals] = useState({
    calories: 2000,
    protein: 50,
    carbs: 50,
    fat: 30,
  });

  // Handle Shopping List Generation
  const handleGenerateShoppingList = async () => {
    if (!mealInput.trim()) {
      setError("Please enter meals for the week");
      return;
    }

    setLoading(true);
    setError("");

    const meals = mealInput.split("\n").filter((m) => m.trim());
    const response = await generateShoppingList(meals);

    if (response.error) {
      setError(response.error);
      setShoppingList([]);
    } else {
      setShoppingList(response.items || []);
      // Auto-fetch cost estimate
      await handleEstimateCost(response.items || []);
    }

    setLoading(false);
  };

  // Handle Cost Estimation
  const handleEstimateCost = async (items = shoppingList) => {
    if (items.length === 0) {
      setError("No items to estimate cost");
      return;
    }

    setLoading(true);
    setError("");

    const response = await estimateCost(items);

    if (response.error) {
      setError(response.error);
      setCostEstimate(null);
    } else {
      setCostEstimate(response);
    }

    setLoading(false);
  };

  // Handle Diet Optimization
  const handleDietOptimization = async () => {
    if (shoppingList.length === 0) {
      setError("Generate a shopping list first");
      return;
    }

    setLoading(true);
    setError("");

    const response = await getDietOptimizations(shoppingList, dietGoals);

    if (response.error) {
      setError(response.error);
      setDietOptimizations(null);
    } else {
      setDietOptimizations(response);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">🛒 Grocery AI</h1>
      <p className="text-gray-600 mb-6">
        Generate smart shopping lists, estimate costs, and optimize your diet with AI-powered recommendations.
      </p>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-300">
        <button
          onClick={() => setActiveTab("shopping-list")}
          className={`px-4 py-2 font-semibold transition ${activeTab === "shopping-list"
              ? "border-b-4 border-green-500 text-green-600"
              : "text-gray-600 hover:text-gray-800"
            }`}
        >
          📋 Shopping List
        </button>
        <button
          onClick={() => {
            setActiveTab("cost-estimation");
            if (shoppingList.length > 0 && !costEstimate) {
              handleEstimateCost(shoppingList);
            }
          }}
          className={`px-4 py-2 font-semibold transition ${activeTab === "cost-estimation"
              ? "border-b-4 border-blue-500 text-blue-600"
              : "text-gray-600 hover:text-gray-800"
            }`}
        >
          💰 Cost Estimation
        </button>
        <button
          onClick={() => {
            setActiveTab("diet-optimization");
            if (shoppingList.length > 0 && !dietOptimizations) {
              handleDietOptimization();
            }
          }}
          className={`px-4 py-2 font-semibold transition ${activeTab === "diet-optimization"
              ? "border-b-4 border-orange-500 text-orange-600"
              : "text-gray-600 hover:text-gray-800"
            }`}
        >
          🎯 Diet Optimization
        </button>
      </div>

      {/* Shopping List Tab */}
      {activeTab === "shopping-list" && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Generate Shopping List
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Enter your meals (one per line):
            </label>
            <textarea
              value={mealInput}
              onChange={(e) => setMealInput(e.target.value)}
              placeholder="Example:&#10;Monday: Grilled chicken with brown rice&#10;Tuesday: Spaghetti with tomato sauce&#10;Wednesday: Vegetable stir-fry"
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={handleGenerateShoppingList}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg disabled:bg-gray-400 transition"
          >
            {loading ? "Generating..." : "Generate Shopping List"}
          </button>

          {/* Shopping List Display */}
          {shoppingList.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                📦 Your Shopping List ({shoppingList.length} items)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {shoppingList.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-green-50 border-l-4 border-green-500 p-4 rounded"
                  >
                    <h4 className="font-semibold text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity} {item.unit}
                    </p>
                    {item.category && (
                      <p className="text-xs text-gray-500 mt-2">
                        Category: {item.category}
                      </p>
                    )}
                  </div>
                ))}
              </div>


            </div>
          )}
        </div>
      )}

      {/* Cost Estimation Tab */}
      {activeTab === "cost-estimation" && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Cost Estimation
          </h2>

          {!shoppingList.length ? (
            <p className="text-gray-600">
              ⚠️ Generate a shopping list first to estimate costs.
            </p>
          ) : (
            <>


              {costEstimate && (
                <div className="mt-6">
                  <div className="bg-blue-50 p-6 rounded-lg mb-6">
                    <p className="text-gray-700 text-sm mb-2">Total Budget</p>
                    <p className="text-4xl font-bold text-blue-600">
                      ${costEstimate.total?.toFixed(2) || "0.00"}
                    </p>
                    {costEstimate.average_per_item && (
                      <p className="text-sm text-gray-600 mt-2">
                        Average per item: ${costEstimate.average_per_item.toFixed(2)}
                      </p>
                    )}
                  </div>

                  {costEstimate.breakdown && (
                    <>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        💵 Cost Breakdown
                      </h3>
                      <div className="space-y-3">
                        {costEstimate.breakdown.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500"
                          >
                            <div>
                              <p className="font-semibold text-gray-800">
                                {item.name}
                              </p>
                              <p className="text-sm text-gray-600">
                                {item.quantity} {item.unit}
                              </p>
                            </div>
                            <p className="text-lg font-bold text-blue-600">
                              ${item.cost?.toFixed(2) || "0.00"}
                            </p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Diet Optimization Tab */}
      {activeTab === "diet-optimization" && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Diet Optimization
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Daily Calorie Goal
              </label>
              <input
                type="number"
                value={dietGoals.calories}
                onChange={(e) =>
                  setDietGoals({ ...dietGoals, calories: parseInt(e.target.value) })
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Protein %
              </label>
              <input
                type="number"
                value={dietGoals.protein}
                onChange={(e) =>
                  setDietGoals({ ...dietGoals, protein: parseInt(e.target.value) })
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Carbs %
              </label>
              <input
                type="number"
                value={dietGoals.carbs}
                onChange={(e) =>
                  setDietGoals({ ...dietGoals, carbs: parseInt(e.target.value) })
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fat %
              </label>
              <input
                type="number"
                value={dietGoals.fat}
                onChange={(e) =>
                  setDietGoals({ ...dietGoals, fat: parseInt(e.target.value) })
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {!shoppingList.length ? (
            <p className="text-gray-600">
              ⚠️ Generate a shopping list first to optimize your diet.
            </p>
          ) : null}

          {dietOptimizations && (
            <div className="mt-6">
              {/* Healthier Alternatives */}
              {dietOptimizations.alternatives &&
                dietOptimizations.alternatives.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      🌿 Healthier Alternatives
                    </h3>
                    <div className="space-y-4">
                      {dietOptimizations.alternatives.map((alt, idx) => (
                        <div
                          key={idx}
                          className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-lg"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold text-gray-800">
                                {alt.original} → {alt.alternative}
                              </p>
                              <p className="text-sm text-gray-600 mt-1">
                                {alt.reason}
                              </p>
                            </div>
                            {alt.benefit && (
                              <span className="bg-green-200 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                                {alt.benefit}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Recommendations */}
              {dietOptimizations.recommendations &&
                dietOptimizations.recommendations.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      💡 Diet Recommendations
                    </h3>
                    <div className="space-y-3">
                      {dietOptimizations.recommendations.map((rec, idx) => (
                        <div
                          key={idx}
                          className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg"
                        >
                          <p className="text-gray-800">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
