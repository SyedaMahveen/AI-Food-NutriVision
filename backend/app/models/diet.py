# app/models/diet.py
from sqlmodel import SQLModel, Field
from typing import Optional

class DietPlan(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int
    day: str                # mon, tue, wed...
    breakfast: Optional[str] = None
    lunch: Optional[str] = None
    dinner: Optional[str] = None
    calories: Optional[int] = None
