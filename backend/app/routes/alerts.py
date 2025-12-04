# app/routes/alerts.py

from fastapi import APIRouter
from app.services.alert_service import evaluate_food_alerts

router = APIRouter()

@router.post("/check")
def check_alerts(food_data: dict):
    return evaluate_food_alerts(food_data)
