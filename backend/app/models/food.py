#app/ models/food.py
from typing import Optional, List
from sqlmodel import SQLModel, Field

class Food(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    ingredients: Optional[str] = None   # comma separated
    calories: Optional[float] = None
    portion_size: Optional[str] = None
    allergens: Optional[str] = None     # comma separated
    cooking_method: Optional[str] = None
