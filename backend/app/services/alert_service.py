# app/services/alert_service.py
def evaluate_food_alerts(food_data: dict):
    """
    Demo logic for alerts.
    Replace with real nutrient + condition + allergy rules later.
    """

    alerts = []

    calories = food_data.get("calories", 0)
    sugar = food_data.get("sugar", 0)
    sodium = food_data.get("sodium", 0)

    if calories > 500:
        alerts.append("High calorie item")

    if sugar > 20:
        alerts.append("High sugar content")

    if sodium > 400:
        alerts.append("High sodium level")

    return {
        "alerts": alerts,
        "count": len(alerts),
        "status": "demo-mode"
    }
