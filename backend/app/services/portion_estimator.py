# app/services/portion_estimator.py
from app.services.ai_service import full_food_analysis

# Standard portion sizes for common foods (in grams)
PORTION_SIZES = {
    "apple": 182,
    "rice": 150,
    "chicken": 100,
    "bread": 32,
    "egg": 50,
    "milk": 240,
    "pizza": 300,
    "samosa": 60,
    "dal": 150,
    "vegetables": 100,
    "fish": 100,
    "beef": 100,
    "tomato": 123,
    "potato": 173,
    "onion": 150,
    "pasta": 180,
    "yogurt": 150,
    "cheese": 28,
    "spinach": 30,
    "carrot": 61,
}

def estimate_portion(image_bytes: bytes, filename: str = "image.jpg"):
    """
    Estimate portion size based on detected food item.
    Returns realistic portion sizes for common foods.
    """
    try:
        # Get food detection and nutrition info
        nutrition_info = full_food_analysis(image_bytes, filename)
        
        if not nutrition_info:
            return _get_default_response()
        
        food_name = nutrition_info.get("food", "Unknown")
        detected_food = food_name.lower()
        
        # Find matching portion size
        portion_grams = PORTION_SIZES.get(detected_food, 150)
        
        # Get base nutrition values
        base_calories = nutrition_info.get("estimated_calories", 200)
        base_protein = nutrition_info.get("protein_g", 10)
        base_carbs = nutrition_info.get("carbs_g", 25)
        base_fat = nutrition_info.get("fat_g", 8)
        
        # Scale nutrition to actual portion (baseline is ~100g)
        scale_factor = portion_grams / 100
        
        return {
            "food_name": food_name,
            "estimated_portion_grams": portion_grams,
            "estimated_portion_description": _get_portion_description(detected_food, portion_grams),
            "estimated_calories": int(base_calories * scale_factor),
            "protein_g": round(base_protein * scale_factor, 1),
            "carbs_g": round(base_carbs * scale_factor, 1),
            "fat_g": round(base_fat * scale_factor, 1),
            "confidence": nutrition_info.get("confidence", 0.7),
            "detection_method": nutrition_info.get("detection_method", "fallback")
        }
    except Exception as e:
        print(f"ERROR in estimate_portion: {e}")
        import traceback
        traceback.print_exc()
        return _get_default_response()




def _get_default_response():
    """Return default response when detection fails."""
    return {
        "food_name": "Unknown",
        "estimated_portion_grams": 150,
        "estimated_portion_description": "Standard serving - unable to analyze image",
        "estimated_calories": 300,
        "protein_g": 10,
        "carbs_g": 45,
        "fat_g": 10,
        "confidence": 0.0,
        "detection_method": "error"
    }


def _get_portion_description(food_name: str, grams: int) -> str:
    """Get a human-readable portion description."""
    descriptions = {
        "apple": f"{grams}g (~1 medium apple)",
        "rice": f"{grams}g (~3/4 cup cooked)",
        "bread": f"{grams}g (~1-2 slices)",
        "egg": f"{grams}g (~1 large egg)",
        "milk": f"{grams}ml (~1 cup)",
        "pizza": f"{grams}g (~2-3 slices)",
        "chicken": f"{grams}g (~3.5 oz serving)",
        "fish": f"{grams}g (~3.5 oz serving)",
        "beef": f"{grams}g (~3.5 oz serving)",
        "samosa": f"{grams}g (~1 samosa)",
        "dal": f"{grams}g (~3/4 cup cooked)",
        "pasta": f"{grams}g (~3/4 cup cooked)",
    }
    return descriptions.get(food_name, f"{grams}g (standard portion)")
