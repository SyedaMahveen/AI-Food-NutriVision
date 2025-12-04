# app/routes/grocery.py

from fastapi import APIRouter
from app.services.grocery_service import suggest_grocery_items

router = APIRouter()

@router.get("/suggest")
def suggest(query: str):
    return suggest_grocery_items(query)
