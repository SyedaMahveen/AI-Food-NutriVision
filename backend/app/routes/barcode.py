# app/routes/barcode.py

from fastapi import APIRouter
from app.services.barcode_scanner import lookup_barcode

router = APIRouter()

@router.get("/scan/{barcode}")
def scan_barcode(barcode: str):
    data = lookup_barcode(barcode)
    return data
