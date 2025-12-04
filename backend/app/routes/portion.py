# app/routes/portion.py

from fastapi import APIRouter, UploadFile, File
from app.services.portion_estimator import estimate_portion

router = APIRouter()

@router.post("/estimate")
async def estimate(file: UploadFile = File(...)):
    img_bytes = await file.read()
    result = estimate_portion(img_bytes, file.filename)
    return result
