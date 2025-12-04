# app/services/diet_assistant.py
def generate_diet_plan(user_data: dict):
    # Demo implementation
    return {
        "diet_plan": [
            {"meal": "Breakfast", "items": ["Oats", "Banana", "Milk"]},
            {"meal": "Lunch", "items": ["Rice", "Dal", "Salad"]},
            {"meal": "Dinner", "items": ["Chapati", "Vegetables"]}
        ],
        "calories_per_day": 1800,
        "status": "demo mode"
    }
