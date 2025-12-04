# app/services/grocery_service.py
from typing import List, Dict, Optional
from app.models.food import Food

# Mock food database with nutrition and pricing
FOOD_DATABASE = {
    "chicken breast": {"category": "Protein", "quantity": 1.5, "unit": "lb", "price": 9.99, "calories": 165, "protein": 31, "carbs": 0, "fat": 3.6},
    "eggs": {"category": "Protein", "quantity": 12, "unit": "count", "price": 5.99, "calories": 78, "protein": 6, "carbs": 0.6, "fat": 5.3},
    "rice": {"category": "Grains", "quantity": 2, "unit": "lb", "price": 4.99, "calories": 130, "protein": 2.7, "carbs": 28, "fat": 0.3},
    "brown rice": {"category": "Grains", "quantity": 2, "unit": "lb", "price": 5.99, "calories": 111, "protein": 2.6, "carbs": 23, "fat": 0.9},
    "pasta": {"category": "Grains", "quantity": 1, "unit": "box", "price": 2.49, "calories": 131, "protein": 5, "carbs": 25, "fat": 1.1},
    "tomato sauce": {"category": "Sauce", "quantity": 24, "unit": "oz", "price": 3.99, "calories": 25, "protein": 1, "carbs": 4, "fat": 0},
    "olive oil": {"category": "Oils", "quantity": 16, "unit": "oz", "price": 12.99, "calories": 120, "protein": 0, "carbs": 0, "fat": 14},
    "spinach": {"category": "Vegetables", "quantity": 10, "unit": "oz", "price": 4.99, "calories": 23, "protein": 2.9, "carbs": 3.6, "fat": 0.4},
    "broccoli": {"category": "Vegetables", "quantity": 1, "unit": "head", "price": 3.49, "calories": 34, "protein": 2.8, "carbs": 7, "fat": 0.4},
    "carrots": {"category": "Vegetables", "quantity": 2, "unit": "lb", "price": 2.99, "calories": 41, "protein": 0.9, "carbs": 10, "fat": 0.2},
    "bell peppers": {"category": "Vegetables", "quantity": 3, "unit": "count", "price": 5.99, "calories": 31, "protein": 1, "carbs": 6, "fat": 0.3},
    "onions": {"category": "Vegetables", "quantity": 3, "unit": "lb", "price": 2.49, "calories": 40, "protein": 1.1, "carbs": 9, "fat": 0.1},
    "garlic": {"category": "Seasonings", "quantity": 1, "unit": "bulb", "price": 1.29, "calories": 4, "protein": 0.2, "carbs": 1, "fat": 0},
    "honey": {"category": "Sweeteners", "quantity": 12, "unit": "oz", "price": 8.99, "calories": 64, "protein": 0, "carbs": 17, "fat": 0},
    "almonds": {"category": "Nuts", "quantity": 8, "unit": "oz", "price": 11.99, "calories": 164, "protein": 6, "carbs": 6, "fat": 14},
    "greek yogurt": {"category": "Dairy", "quantity": 32, "unit": "oz", "price": 7.99, "calories": 59, "protein": 10, "carbs": 3.3, "fat": 0.4},
    "milk": {"category": "Dairy", "quantity": 1, "unit": "gal", "price": 5.49, "calories": 61, "protein": 3.2, "carbs": 4.8, "fat": 3.3},
    "cheddar cheese": {"category": "Dairy", "quantity": 8, "unit": "oz", "price": 6.99, "calories": 113, "protein": 7, "carbs": 0.4, "fat": 9.3},
    "lentils": {"category": "Legumes", "quantity": 1, "unit": "lb", "price": 3.99, "calories": 116, "protein": 9, "carbs": 20, "fat": 0.4},
    "black beans": {"category": "Legumes", "quantity": 1, "unit": "can", "price": 1.79, "calories": 41, "protein": 2.4, "carbs": 7, "fat": 0.2},
    "salmon": {"category": "Protein", "quantity": 1, "unit": "lb", "price": 14.99, "calories": 206, "protein": 22, "carbs": 0, "fat": 13},
    "salt": {"category": "Seasonings", "quantity": 1, "unit": "container", "price": 1.99, "calories": 0, "protein": 0, "carbs": 0, "fat": 0},
    "whole wheat pasta": {"category": "Grains", "quantity": 1, "unit": "box", "price": 3.49, "calories": 174, "protein": 7.5, "carbs": 37, "fat": 0.8},
    "potatoes": {"category": "Vegetables", "quantity": 5, "unit": "lb", "price": 5.99, "calories": 77, "protein": 2, "carbs": 17, "fat": 0.1},
    "peas": {"category": "Vegetables", "quantity": 1, "unit": "bag", "price": 3.99, "calories": 81, "protein": 5.4, "carbs": 14, "fat": 0.4},
    "flour": {"category": "Grains", "quantity": 5, "unit": "lb", "price": 6.99, "calories": 364, "protein": 10, "carbs": 76, "fat": 1},
    "gram flour": {"category": "Grains", "quantity": 2, "unit": "lb", "price": 8.99, "calories": 356, "protein": 22, "carbs": 53, "fat": 6},
    "oil": {"category": "Oils", "quantity": 32, "unit": "oz", "price": 9.99, "calories": 120, "protein": 0, "carbs": 0, "fat": 14},
    "spices": {"category": "Seasonings", "quantity": 1, "unit": "set", "price": 15.99, "calories": 0, "protein": 0, "carbs": 0, "fat": 0},
}

def suggest_grocery_items(query: str):
    """Suggest grocery items based on query"""
    query = query.lower()
    
    data = {
        "protein": ["Chicken Breast", "Eggs", "Paneer", "Tofu", "Lentils"],
        "low calorie": ["Cucumber", "Spinach", "Apple", "Pomelo", "Oats"],
        "budget": ["Rice", "Potatoes", "Onion", "Bananas", "Peanut Butter"],
        "snacks": ["Nuts", "Greek Yogurt", "Energy Bars", "Roasted Chana"]
    }
    
    for key in data:
        if key in query:
            return {"category": key, "items": data[key]}
    
    return {"message": "No category match found", "suggestions": list(data.keys())}


def generate_grocery_list(meals: List[str]) -> List[Dict]:
    """Generate shopping list from meal names"""
    items = []
    
    # Map common ingredients from meal names
    ingredient_mapping = {
        "chicken": "chicken breast",
        "rice": "brown rice",
        "pasta": "pasta",
        "tomato": "tomato sauce",
        "stir-fry": ["broccoli", "carrots", "bell peppers", "onions"],
        "salad": ["spinach", "carrots", "bell peppers"],
        "eggs": "eggs",
        "fish": "salmon",
        "vegetables": ["broccoli", "spinach", "carrots"],
        "grilled": "olive oil",
        "sauce": "tomato sauce",
        "samosa": ["potatoes", "peas", "flour", "oil"],
        "dhokla": ["gram flour", "yogurt"],
        "curry": ["onions", "tomato sauce", "spices"],
        "dal": "lentils",
        "roti": "flour",
        "paratha": ["flour", "oil"],
    }
    
    seen = set()
    
    for meal in meals:
        meal_lower = meal.lower()
        for keyword, ingredient in ingredient_mapping.items():
            if keyword in meal_lower:
                if isinstance(ingredient, list):
                    for ing in ingredient:
                        if ing not in seen:
                            item = create_grocery_item(ing)
                            if item:
                                items.append(item)
                                seen.add(ing)
                else:
                    if ingredient not in seen:
                        item = create_grocery_item(ingredient)
                        if item:
                            items.append(item)
                            seen.add(ingredient)
    
    # Add base staples if list is small
    if len(items) < 5:
        staples = ["olive oil", "onions", "garlic", "salt"]
        for staple in staples:
            if staple not in seen:
                item = create_grocery_item(staple)
                if item:
                    items.append(item)
                    seen.add(staple)
    
    return items


def create_grocery_item(name: str) -> Optional[Dict]:
    """Create a grocery item from database or return None"""
    name_lower = name.lower()
    if name_lower in FOOD_DATABASE:
        db_item = FOOD_DATABASE[name_lower]
        return {
            "name": name.title(),
            "quantity": db_item["quantity"],
            "unit": db_item["unit"],
            "category": db_item["category"],
            "price": db_item["price"],
            "calories": db_item.get("calories", 0),
            "protein": db_item.get("protein", 0),
        }
    return None


def estimate_cost(items: List[Dict]) -> Dict:
    """Estimate total cost of items"""
    total = sum(item.get("price", 0) for item in items)
    breakdown = []
    
    for item in items:
        breakdown.append({
            "name": item.get("name", "Unknown"),
            "quantity": item.get("quantity", 0),
            "unit": item.get("unit", ""),
            "cost": item.get("price", 0),
        })
    
    return {
        "total": total,
        "average_per_item": total / len(items) if items else 0,
        "breakdown": breakdown,
        "currency": "USD",
    }


def optimize_diet(items: List[Dict], diet_goals: Dict) -> Dict:
    """Suggest healthier alternatives and diet optimization"""
    alternatives = []
    recommendations = []
    
    # Healthier swaps
    healthier_swaps = {
        "white rice": {"alternative": "brown rice", "reason": "Higher fiber, better for digestion and blood sugar control", "benefit": "Better for weight management"},
        "pasta": {"alternative": "whole wheat pasta", "reason": "More nutrients and fiber", "benefit": "Healthier choice"},
        "cheese": {"alternative": "greek yogurt", "reason": "Higher protein, lower fat", "benefit": "+10g protein"},
        "butter": {"alternative": "olive oil", "reason": "Healthier fats (unsaturated)", "benefit": "Heart healthy"},
    }
    
    total_calories = sum(item.get("calories", 0) for item in items)
    total_protein = sum(item.get("protein", 0) for item in items)
    
    # Generate alternatives
    for item in items:
        item_name = item.get("name", "").lower()
        for swap_from, swap_to in healthier_swaps.items():
            if swap_from in item_name:
                alternatives.append({
                    "original": item.get("name", ""),
                    "alternative": swap_to["alternative"].title(),
                    "reason": swap_to["reason"],
                    "benefit": swap_to.get("benefit", ""),
                })
    
    # Diet recommendations
    target_calories = diet_goals.get("calories", 2000)
    if total_calories > 0:
        recommendations.append(
            f"Your shopping list provides ~{int(total_calories)} calories per serving. Adjust portions to meet your {target_calories} calorie goal."
        )
    
    if total_protein < (target_calories * 0.30) / 4:  # Protein kcal / 4 kcal per gram
        recommendations.append(
            f"Consider adding more protein sources. Current estimated protein: {int(total_protein)}g. Target: {int(target_calories * (diet_goals.get('protein', 30) / 100) / 4)}g."
        )
    
    recommendations.append(
        "Include a variety of colorful vegetables for different micronutrients and antioxidants."
    )
    recommendations.append(
        "Balance your macros: Aim for protein, complex carbs, and healthy fats in each meal."
    )
    
    return {
        "alternatives": alternatives,
        "recommendations": recommendations,
        "estimated_macros": {
            "calories": int(total_calories),
            "protein": f"{int(total_protein)}g",
        },
    }

