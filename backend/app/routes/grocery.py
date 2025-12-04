# app/routes/grocery.py
from fastapi import APIRouter, HTTPException
from typing import List, Dict, Optional
from pydantic import BaseModel
from app.services.grocery_service import (
    suggest_grocery_items,
    generate_grocery_list,
    estimate_cost,
    optimize_diet,
)

router = APIRouter(tags=["Grocery AI"])


class ShoppingListRequest(BaseModel):
    meals: List[str]


class CostEstimationRequest(BaseModel):
    items: List[Dict]


class DietOptimizationRequest(BaseModel):
    items: List[Dict]
    dietGoals: Dict = {
        "calories": 2000,
        "protein": 30,
        "carbs": 45,
        "fat": 25,
    }


@router.get("/test")
def test_grocery():
    """Test endpoint"""
    return {"message": "Grocery route active"}


@router.get("/suggest")
def suggest(query: str):
    """Suggest grocery items based on query"""
    return suggest_grocery_items(query)


@router.post("/shopping-list")
def generate_shopping_list(request: ShoppingListRequest):
    """Generate shopping list from meals"""
    try:
        items = generate_grocery_list(request.meals)
        return {
            "items": items,
            "count": len(items),
            "message": f"Generated shopping list with {len(items)} items",
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/estimate-cost")
def cost_estimation(request: CostEstimationRequest):
    """Estimate cost of items"""
    try:
        estimate = estimate_cost(request.items)
        return estimate
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/optimize-diet")
def diet_optimization(request: DietOptimizationRequest):
    """Get diet optimization suggestions"""
    try:
        optimizations = optimize_diet(request.items, request.dietGoals)
        return optimizations
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

