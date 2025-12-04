# app/models/barcode.py
from sqlmodel import SQLModel, Field
from typing import Optional

class BarcodeProduct(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    barcode: str
    name: Optional[str] = None
    brand: Optional[str] = None
    calories: Optional[float] = None
    nutrients: Optional[str] = None  # json string