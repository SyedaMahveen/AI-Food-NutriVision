# app/routes/diet.py

from fastapi import APIRouter
from app.services.diet_assistant import generate_diet_plan

router = APIRouter()

@router.post("/plan")
def diet_plan(user: dict):
    return generate_diet_plan(user)
