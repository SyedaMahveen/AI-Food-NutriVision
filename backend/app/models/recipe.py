# app/models/recipe.py
from typing import Optional
from sqlmodel import SQLModel, Field

class Recipe(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    ingredients: Optional[str] = None    # newline or comma separated
    steps: Optional[str] = None
    calories: Optional[float] = None
    cooking_time: Optional[int] = None
    healthy_alternatives: Optional[str] = None
    spicy: Optional[bool] = False
    vegetarian: Optional[bool] = False
