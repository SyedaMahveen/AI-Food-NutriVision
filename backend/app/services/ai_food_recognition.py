
# app/services/ai_food_recognition.py

from PIL import Image
import io
import numpy as np
from typing import Optional, List, Dict
import os

# Try to import TensorFlow; if fails, we'll use filename fallback only
try:
    import tensorflow as tf
    TF_AVAILABLE = True
except ImportError:
    TF_AVAILABLE = False

# Comprehensive food class labels (common food items)
FOOD_LABELS = [
    "apple", "apricot", "avocado", "banana", "blueberry", "cantaloupe", "cherry",
    "cucumber", "dates", "grape", "grapefruit", "guava", "kiwi", "lemon",
    "lime", "mango", "melon", "orange", "papaya", "peach", "pear", "pineapple",
    "plum", "pomegranate", "raspberry", "strawberry", "tangerine", "watermelon",
    "bread", "butter", "cheese", "egg", "honey", "jam", "milk", "yogurt",
    "pizza", "pasta", "rice", "burger", "sandwich", "salad", "samosa",
    "chips", "cookie", "donut", "cake", "ice_cream", "chocolate",
    "chicken", "beef", "pork", "fish", "shrimp", "salmon", "tuna",
    "tomato", "lettuce", "carrot", "broccoli", "spinach", "onion", "garlic",
    "potato", "sweet_potato", "corn", "peas", "beans", "lentils",
    "coffee", "tea", "juice", "soda", "water", "beer", "wine",
    "soup", "curry", "stir_fry", "grilled_chicken", "roasted_vegetables"
]


def _preprocess_image(image_bytes: bytes, target_size: tuple = (224, 224)) -> Optional[np.ndarray]:
    """
    Preprocess image bytes to normalized numpy array suitable for model input.
    """
    try:
        img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        img = img.resize(target_size, Image.Resampling.LANCZOS)
        img_array = np.array(img, dtype=np.float32)
        img_array = img_array / 255.0  # Normalize to [0, 1]
        return img_array
    except Exception as e:
        print(f"Image preprocessing error: {e}")
        return None


def _predict_with_keras_model(image_bytes: bytes) -> Optional[Dict]:
    """
    Try to load and use the Keras model for food detection.
    Returns None if model load/prediction fails.
    """
    if not TF_AVAILABLE:
        return None

    try:
        model_path = os.path.join(
            os.path.dirname(os.path.dirname(__file__)),
            "models", "my_model.keras"
        )
        if not os.path.exists(model_path):
            return None

        model = tf.keras.models.load_model(model_path, compile=False)
        img_array = _preprocess_image(image_bytes)
        if img_array is None:
            return None

        # Add batch dimension
        img_batch = np.expand_dims(img_array, axis=0)
        predictions = model.predict(img_batch, verbose=0)

        # Get top prediction
        if predictions is not None and len(predictions) > 0:
            pred_probs = predictions[0]
            top_idx = np.argmax(pred_probs)
            confidence = float(pred_probs[top_idx])

            # Map to label
            if top_idx < len(FOOD_LABELS):
                food_name = FOOD_LABELS[top_idx].replace("_", " ").title()
                return {
                    "name": food_name,
                    "confidence": confidence,
                    "method": "model"
                }
    except Exception as e:
        print(f"Keras model prediction error: {e}")
        return None

    return None


def _detect_from_filename(filename: Optional[str]) -> Optional[Dict]:
    """
    Lightweight filename-based detection fallback.
    """
    if not filename:
        return None

    name = filename.lower()
    keyword_map = {
        "samosa": "Samosa",
        "pizza": "Pizza",
        "burger": "Burger",
        "banana": "Banana",
        "apple": "Apple",
        "chicken": "Chicken",
        "rice": "Rice",
        "pasta": "Pasta",
        "sandwich": "Sandwich",
        "salad": "Salad",
        "soup": "Soup",
        "curry": "Curry",
        "bread": "Bread",
        "egg": "Egg",
        "fish": "Fish",
        "beef": "Beef",
        "pork": "Pork",
        "steak": "Steak",
        "tuna": "Tuna",
        "salmon": "Salmon",
    }

    for key, label in keyword_map.items():
        if key in name:
            return {
                "name": label,
                "confidence": 0.85,
                "method": "filename"
            }

    return None


def detect_food_yolo(image_bytes: bytes, filename: Optional[str] = None) -> Dict:
    """
    Detect food from image bytes using multiple strategies:
    1. Try Keras model if available
    2. Fall back to filename-based detection
    3. Return empty items if neither works
    """
    items = []

    # Strategy 1: Try Keras model prediction
    model_result = _predict_with_keras_model(image_bytes)
    if model_result:
        items.append(model_result)
        return {"items": items}

    # Strategy 2: Filename-based fallback
    filename_result = _detect_from_filename(filename)
    if filename_result:
        items.append(filename_result)
        return {"items": items}

    # Strategy 3: No detection
    return {"items": items}
