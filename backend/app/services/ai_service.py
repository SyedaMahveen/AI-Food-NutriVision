# app/services/ai_service.py
from typing import Optional
from app.services.ai_food_recognition import (
    _predict_with_keras_model,
    _detect_from_filename,
    FOOD_LABELS
)

# Comprehensive nutrition database for common foods
NUTRITION_DB = {
    "Samosa": {"calories": 262, "protein": 5, "carbs": 30, "fat": 14},
    "Pizza": {"calories": 285, "protein": 12, "carbs": 36, "fat": 10},
    "Burger": {"calories": 350, "protein": 25, "carbs": 30, "fat": 16},
    "Banana": {"calories": 105, "protein": 1.3, "carbs": 27, "fat": 0.3},
    "Apple": {"calories": 95, "protein": 0.5, "carbs": 25, "fat": 0.3},
    "Chicken": {"calories": 239, "protein": 26, "carbs": 0, "fat": 14},
    "Rice": {"calories": 130, "protein": 2.7, "carbs": 28, "fat": 0.3},
    "Pasta": {"calories": 220, "protein": 8, "carbs": 43, "fat": 1.1},
    "Sandwich": {"calories": 250, "protein": 12, "carbs": 30, "fat": 10},
    "Salad": {"calories": 150, "protein": 5, "carbs": 20, "fat": 6},
    "Soup": {"calories": 100, "protein": 3, "carbs": 15, "fat": 2},
    "Curry": {"calories": 300, "protein": 20, "carbs": 25, "fat": 12},
    "Bread": {"calories": 265, "protein": 9, "carbs": 49, "fat": 3.3},
    "Egg": {"calories": 155, "protein": 13, "carbs": 1.1, "fat": 11},
    "Fish": {"calories": 208, "protein": 20, "carbs": 0, "fat": 13},
    "Beef": {"calories": 250, "protein": 26, "carbs": 0, "fat": 15},
    "Pork": {"calories": 242, "protein": 27, "carbs": 0, "fat": 14},
    "Steak": {"calories": 271, "protein": 36, "carbs": 0, "fat": 13},
    "Tuna": {"calories": 132, "protein": 29, "carbs": 0, "fat": 1.3},
    "Salmon": {"calories": 280, "protein": 25, "carbs": 0, "fat": 20},
    "Spinach": {"calories": 23, "protein": 2.9, "carbs": 3.6, "fat": 0.4},
    "Carrot": {"calories": 41, "protein": 0.9, "carbs": 10, "fat": 0.2},
    "Broccoli": {"calories": 34, "protein": 2.8, "carbs": 7, "fat": 0.4},
    "Tomato": {"calories": 18, "protein": 0.9, "carbs": 3.9, "fat": 0.2},
}


def full_food_analysis(image_bytes: bytes, filename: Optional[str] = None) -> dict:
    """
    Provide comprehensive food analysis using:
    1. Keras model prediction if available
    2. Filename-based detection as fallback
    3. Nutrition lookup from database
    """

    food_name = None
    confidence = 0.0
    method = "unknown"

    # Try Keras model prediction
    model_result = _predict_with_keras_model(image_bytes)
    if model_result:
        food_name = model_result.get("name")
        confidence = model_result.get("confidence", 0.0)
        method = "model"
    # Fallback to filename detection
    elif filename:
        filename_result = _detect_from_filename(filename)
        if filename_result:
            food_name = filename_result.get("name")
            confidence = filename_result.get("confidence", 0.0)
            method = "filename"

    # If no detection, return error response
    if not food_name:
        return {
            "food": "Unknown",
            "confidence": 0.0,
            "estimated_calories": 200,
            "protein_g": 10,
            "carbs_g": 25,
            "fat_g": 8,
            "detection_method": "fallback",
            "message": "Unable to detect food from image. Please upload a clearer image or use a filename that contains the food name."
        }

    # Look up nutrition info
    nutrition = NUTRITION_DB.get(food_name, {"calories": 200, "protein": 10, "carbs": 25, "fat": 8})

    return {
        "food": food_name,
        "confidence": round(confidence, 2),
        "estimated_calories": nutrition.get("calories", 200),
        "protein_g": nutrition.get("protein", 10),
        "carbs_g": nutrition.get("carbs", 25),
        "fat_g": nutrition.get("fat", 8),
        "detection_method": method
    }

