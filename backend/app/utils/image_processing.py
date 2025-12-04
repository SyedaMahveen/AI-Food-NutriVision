# app/utils/image_processing.py
from PIL import Image
import io

def load_image_from_bytes(b: bytes) -> Image.Image:
    return Image.open(io.BytesIO(b)).convert("RGB")
