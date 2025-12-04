
# app/models/alerts.py
from sqlmodel import SQLModel, Field
from typing import Optional

class Alert(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int
    title: str
    message: str
    level: str = "info"   # info / warning / danger
    is_read: bool = False