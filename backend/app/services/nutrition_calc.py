from typing import List, Dict


# Ingredient database with nutrition values (per standard serving)
INGREDIENT_DB = {
    # oils & fats
    "oil": {"calories": 120, "protein": 0, "carbs": 0, "fat": 14, "vegetarian": True},
    "ghee": {"calories": 135, "protein": 0, "carbs": 0, "fat": 15, "vegetarian": True},
    "butter": {"calories": 102, "protein": 0.1, "carbs": 0, "fat": 11.5, "vegetarian": True},
    "olive oil": {"calories": 119, "protein": 0, "carbs": 0, "fat": 13.5, "vegetarian": True},
    "coconut oil": {"calories": 120, "protein": 0, "carbs": 0, "fat": 14, "vegetarian": True},
    
    # proteins
    "chicken": {"calories": 165, "protein": 31, "carbs": 0, "fat": 3.6, "vegetarian": False},
    "beef": {"calories": 250, "protein": 26, "carbs": 0, "fat": 15, "vegetarian": False},
    "fish": {"calories": 100, "protein": 20, "carbs": 0, "fat": 1.3, "vegetarian": False},
    "mutton": {"calories": 215, "protein": 25, "carbs": 0, "fat": 12, "vegetarian": False},
    "egg": {"calories": 78, "protein": 6, "carbs": 0.6, "fat": 5.3, "vegetarian": True},
    "milk": {"calories": 61, "protein": 3.2, "carbs": 4.8, "fat": 3.3, "vegetarian": True},
    "yogurt": {"calories": 59, "protein": 10, "carbs": 3.3, "fat": 0.4, "vegetarian": True},
    "cheese": {"calories": 113, "protein": 7, "carbs": 0.4, "fat": 9.3, "vegetarian": True},
    "paneer": {"calories": 265, "protein": 25, "carbs": 1, "fat": 21, "vegetarian": True},
    
    # grains & carbs
    "rice": {"calories": 130, "protein": 2.7, "carbs": 28, "fat": 0.3, "vegetarian": True},
    "brown rice": {"calories": 111, "protein": 2.6, "carbs": 23, "fat": 0.9, "vegetarian": True},
    "bread": {"calories": 265, "protein": 9, "carbs": 49, "fat": 3.3, "vegetarian": True},
    "wheat": {"calories": 364, "protein": 13.7, "carbs": 71, "fat": 2.5, "vegetarian": True},
    "pasta": {"calories": 131, "protein": 5, "carbs": 25, "fat": 1.1, "vegetarian": True},
    
    # vegetables
    "tomato": {"calories": 18, "protein": 0.9, "carbs": 3.9, "fat": 0.2, "vegetarian": True},
    "onion": {"calories": 40, "protein": 1.1, "carbs": 9, "fat": 0.1, "vegetarian": True},
    "garlic": {"calories": 149, "protein": 6.4, "carbs": 33, "fat": 0.5, "vegetarian": True},
    "spinach": {"calories": 23, "protein": 2.9, "carbs": 3.6, "fat": 0.4, "vegetarian": True},
    "carrot": {"calories": 41, "protein": 0.9, "carbs": 10, "fat": 0.2, "vegetarian": True},
    "broccoli": {"calories": 34, "protein": 2.8, "carbs": 7, "fat": 0.4, "vegetarian": True},
    "potato": {"calories": 77, "protein": 2.1, "carbs": 17, "fat": 0.1, "vegetarian": True},
    "cucumber": {"calories": 16, "protein": 0.7, "carbs": 3.6, "fat": 0.1, "vegetarian": True},
    "pepper": {"calories": 31, "protein": 1, "carbs": 6, "fat": 0.3, "vegetarian": True},
    "cabbage": {"calories": 25, "protein": 1.3, "carbs": 5.8, "fat": 0.1, "vegetarian": True},
    
    # spices & seasonings
    "salt": {"calories": 0, "protein": 0, "carbs": 0, "fat": 0, "vegetarian": True},
    "sugar": {"calories": 387, "protein": 0, "carbs": 100, "fat": 0, "vegetarian": True},
    "honey": {"calories": 64, "protein": 0, "carbs": 17, "fat": 0, "vegetarian": True},
    "jaggery": {"calories": 383, "protein": 0.3, "carbs": 98, "fat": 0.3, "vegetarian": True},
    
    # legumes
    "dal": {"calories": 116, "protein": 9, "carbs": 20, "fat": 0.4, "vegetarian": True},
    "lentil": {"calories": 116, "protein": 9, "carbs": 20, "fat": 0.4, "vegetarian": True},
    "bean": {"calories": 127, "protein": 8.7, "carbs": 23, "fat": 0.4, "vegetarian": True},
    "chickpea": {"calories": 164, "protein": 15, "carbs": 27, "fat": 2.6, "vegetarian": True},
}

HEALTHIER_SWAPS = {
    "ghee": {"replace": "olive oil", "reason": "Lower in saturated fat, rich in antioxidants"},
    "butter": {"replace": "olive oil or coconut oil", "reason": "Healthier unsaturated fats"},
    "sugar": {"replace": "honey or jaggery", "reason": "Natural sweeteners with nutrients"},
    "white rice": {"replace": "brown rice", "reason": "Higher fiber, better digestion"},
    "refined flour": {"replace": "whole wheat flour", "reason": "More nutrients and fiber"},
    "salt": {"replace": "reduce quantity", "reason": "Lower sodium for heart health"},
    "oil": {"replace": "use olive oil in moderation", "reason": "Heart-healthy option"},
}

COOKING_TIME_KEYWORDS = {
    "fry": 15,
    "grill": 20,
    "bake": 30,
    "boil": 20,
    "steam": 15,
    "slow cook": 60,
    "roast": 45,
    "simmer": 30,
}


def _extract_ingredients(text: str) -> List[str]:
    text_lower = text.lower()
    found = []
    for ingredient in INGREDIENT_DB.keys():
        if ingredient in text_lower:
            found.append(ingredient.title())
    return list(set(found))


def _calculate_nutrition(ingredients: List[str]) -> Dict:
    total_calories = 0
    total_protein = 0
    total_carbs = 0
    total_fat = 0
    
    for ing in ingredients:
        ing_lower = ing.lower()
        if ing_lower in INGREDIENT_DB:
            nutrition = INGREDIENT_DB[ing_lower]
            total_calories += nutrition.get("calories", 0)
            total_protein += nutrition.get("protein", 0)
            total_carbs += nutrition.get("carbs", 0)
            total_fat += nutrition.get("fat", 0)
    
    if total_calories == 0:
        total_calories = 200
        total_protein = 10
        total_carbs = 25
        total_fat = 8
    
    return {
        "calories": int(total_calories),
        "protein": round(total_protein, 1),
        "carbs": round(total_carbs, 1),
        "fat": round(total_fat, 1),
    }


def _get_healthy_alternatives(text: str) -> List[Dict]:
    """Find ingredients that should be replaced with healthier options."""
    alternatives = []
    text_lower = text.lower()
    
    for unhealthy, swap_info in HEALTHIER_SWAPS.items():
        if unhealthy in text_lower:
            alternatives.append({
                "current": unhealthy,
                "healthier": swap_info["replace"],
                "reason": swap_info["reason"]
            })
    
    return alternatives


def _detect_vegetarian_status(ingredients: List[str]) -> bool:
    """Determine if recipe is vegetarian based on ingredients."""
    for ing in ingredients:
        ing_lower = ing.lower()
        if ing_lower in INGREDIENT_DB:
            if not INGREDIENT_DB[ing_lower].get("vegetarian", True):
                return False
    return True


def _detect_cooking_time(text: str) -> int:
    """Estimate cooking time based on keywords in recipe text."""
    text_lower = text.lower()
    estimated_time = 0
    
    for keyword, time in COOKING_TIME_KEYWORDS.items():
        if keyword in text_lower:
            estimated_time = max(estimated_time, time)
    
    # If no cooking keywords found, estimate based on ingredient count
    if estimated_time == 0:
        # Count words as rough ingredient count
        word_count = len(text.split())
        estimated_time = min(15 + (word_count // 3), 45)
    
    return estimated_time


def _detect_missing_nutrition_info(ingredients: List[str], text: str) -> List[str]:
    """Identify missing nutritional information."""
    missing = []
    text_lower = text.lower()
    
    # Check for quantities
    if not any(char.isdigit() for char in text):
        missing.append("Ingredient quantities not specified")
    
    # Check for protein content
    has_protein = any(ing.lower() in text_lower for ing in ["chicken", "fish", "egg", "paneer", "bean", "lentil", "dal"])
    if not has_protein:
        missing.append("No protein source detected - add chicken, fish, eggs, or legumes")
    
    # Check for vegetables
    if "vegetable" not in text_lower and "spinach" not in text_lower and "carrot" not in text_lower:
        missing.append("Consider adding vegetables for fiber and nutrients")
    
    # Check for healthy fats
    if "olive" not in text_lower and "coconut" not in text_lower:
        missing.append("No healthy fats detected - consider adding olive oil")
    
    return missing[:4]  # Return top 4 missing items


def analyze_recipe_text(text: str) -> Dict:
    if not text or not text.strip():
        return {
            "estimated_calories": 0,
            "protein_g": 0,
            "carbs_g": 0,
            "fat_g": 0,
            "ingredients_found": [],
            "healthy_alternatives": [],
            "missing_nutrition_info": ["Please provide recipe or ingredients"],
            "cooking_time_minutes": 0,
            "is_vegetarian": True,
            "suggestions": []
        }
    
    ingredients = _extract_ingredients(text)
    nutrition = _calculate_nutrition(ingredients)
    healthy_alts = _get_healthy_alternatives(text)
    is_veg = _detect_vegetarian_status(ingredients)
    cooking_time = _detect_cooking_time(text)
    missing_info = _detect_missing_nutrition_info(ingredients, text)
    
    return {
        "estimated_calories": nutrition["calories"],
        "protein_g": nutrition["protein"],
        "carbs_g": nutrition["carbs"],
        "fat_g": nutrition["fat"],
        "ingredients_found": ingredients,
        "healthy_alternatives": healthy_alts,
        "missing_nutrition_info": missing_info,
        "cooking_time_minutes": cooking_time,
        "is_vegetarian": is_veg,
        "suggestions": [f"Add more vegetables" if not is_veg else "Great vegetarian choice!"]
    }
