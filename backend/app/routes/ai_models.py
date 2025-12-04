# app/routes/ai_models.py

from fastapi import APIRouter, UploadFile, File, HTTPException
from app.utils import load_models

router = APIRouter()

@router.post("/analyze-text")
async def analyze_text(data: dict):
    """
    Nutrition prediction using vectorizer + ML model (.pkl)
    """
    try:
        text = data.get("text", "")
        vec = load_models.vectorizer.transform([text])
        pred = load_models.nutrition_model.predict(vec)[0]

        return {"nutrition_prediction": pred}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)):
    """
    Keras model (.keras) image-based classifier
    """
    try:
        img_bytes = await file.read()

        try:
            model = load_models.get_keras_model()
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Image model unavailable: {e}")

        # TODO: convert `img_bytes` into the input shape your Keras model expects.
        # This is a placeholder until the preprocessing is implemented.
        pred = model.predict([0])

        return {"image_prediction": str(pred)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
