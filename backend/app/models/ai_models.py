# app/models/ai_models.py
from fastapi import APIRouter, UploadFile, File
from app.services.ai_service import full_food_analysis

router = APIRouter(prefix="/ai", tags=["AI Models"])

@router.post("/analyze")
async def analyze_food(file: UploadFile = File(...)):
    image = await file.read()
    result = full_food_analysis(image)
    return result