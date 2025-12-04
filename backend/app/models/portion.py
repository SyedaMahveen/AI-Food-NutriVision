# app/models/portion.py
from sqlmodel import SQLModel, Field
from typing import Optional

class PortionEstimate(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int
    food_name: Optional[str] = None
    volume_ml: Optional[float] = None
    weight_g: Optional[float] = None
    confidence: Optional[float] = None
