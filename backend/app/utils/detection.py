
from PIL import Image
import io

def detect_food_yolo(image_bytes: bytes):
    """Temporary dummy detection (since YOLO removed)."""

    # Just to ensure image loads (prevents errors)
    Image.open(io.BytesIO(image_bytes)).convert("RGB")

    # ALWAYS return a dummy object so frontend works
    return {
        "items": [
            {
                "label": "Sample Food",
                "confidence": 0.95,
                "bbox": [50, 50, 250, 250]
            }
        ]
    }
