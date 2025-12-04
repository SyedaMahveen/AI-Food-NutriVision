
# app/routes/recipe.py

from fastapi import APIRouter
from pydantic import BaseModel
from app.services.nutrition_calc import analyze_recipe_text

class RecipeInput(BaseModel):
    text: str

router = APIRouter()

@router.post("/analyze")
def analyze_recipe_route(recipe_input: RecipeInput):
    result = analyze_recipe_text(recipe_input.text)
    return result
