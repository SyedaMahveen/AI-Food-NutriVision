# app/routes/food.py

from fastapi import APIRouter, UploadFile, File
from app.services.ai_food_recognition import detect_food_yolo
from app.services.ai_service import full_food_analysis

router = APIRouter()

@router.post("/detect")
async def detect_food(file: UploadFile = File(...)):
    image_bytes = await file.read()
    filename = getattr(file, "filename", "")
    detection = detect_food_yolo(image_bytes, filename=filename)
    ai_analysis = full_food_analysis(image_bytes, filename=filename)

    return {
        "detection": detection,
        "analysis": ai_analysis
    }
