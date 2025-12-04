# backend/app/utils/load_model.py

# backend/app/utils/load_models.py

import os
import pickle
import tensorflow as tf

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "models")

IMAGE_MODEL_PATH = os.path.join(MODEL_DIR, "my_model.keras")
NUTRITION_MODEL_PATH = os.path.join(MODEL_DIR, "nutrition_model.pkl")
VECTORIZER_PATH = os.path.join(MODEL_DIR, "vectorizer.pkl")

# Verify paths exist
if not os.path.exists(IMAGE_MODEL_PATH):
    raise FileNotFoundError(f"Image model not found: {IMAGE_MODEL_PATH}")
if not os.path.exists(NUTRITION_MODEL_PATH):
    raise FileNotFoundError(f"Nutrition model not found: {NUTRITION_MODEL_PATH}")
if not os.path.exists(VECTORIZER_PATH):
    raise FileNotFoundError(f"Vectorizer not found: {VECTORIZER_PATH}")


def load_all_models():
    try:
        # Load Keras image model
        # Note: We avoid loading the Keras image model here to prevent
        # import-time failures (Keras models can raise errors when deserializing
        # depending on their internals). Load only the smaller pickle models.

        # Load nutrition ML model
        with open(NUTRITION_MODEL_PATH, "rb") as f:
            try:
                nutrition_model = pickle.load(f)
            except ModuleNotFoundError as e:
                missing = e.name if hasattr(e, "name") else str(e)
                msg = (
                    f"Failed to unpickle nutrition model: missing module '{missing}'.\n"
                    "This usually means a required package (e.g. scikit-learn) is not installed in the current environment.\n"
                    "Install it in your virtualenv, e.g.: `pip install scikit-learn` and restart the server."
                )
                print("❌ " + msg)
                raise ImportError(msg) from e

        # Load vectorizer for nutrition text
        with open(VECTORIZER_PATH, "rb") as f:
            try:
                vectorizer = pickle.load(f)
            except ModuleNotFoundError as e:
                missing = e.name if hasattr(e, "name") else str(e)
                msg = (
                    f"Failed to unpickle vectorizer: missing module '{missing}'.\n"
                    "This usually means a required package (e.g. scikit-learn) is not installed in the current environment.\n"
                    "Install it in your virtualenv, e.g.: `pip install scikit-learn` and restart the server."
                )
                print("❌ " + msg)
                raise ImportError(msg) from e

        print("✅ Nutrition models loaded successfully!")
        return nutrition_model, vectorizer

    except Exception as e:
        print(f"❌ Error loading models: {e}")
        raise e


# Lazy-load the image (Keras) model on demand to avoid import-time deserialization errors.
keras_model = None

def get_keras_model():
    """Return the Keras image model, loading it on first call.

    Raises the original exception if loading fails so callers can handle/report it.
    """
    global keras_model
    if keras_model is None:
        try:
            keras_model = tf.keras.models.load_model(IMAGE_MODEL_PATH, compile=False)
            print("✅ Image model loaded successfully!")
        except Exception as e:
            print(f"❌ Error loading image model: {e}")
            raise
    return keras_model

# Load nutrition/vectorizer at import time (these are small pickle files)
try:
    nutrition_model, vectorizer = load_all_models()
except Exception:
    # Propagate so startup fails if critical arithmetic models are missing
    raise

__all__ = ["nutrition_model", "vectorizer", "get_keras_model", "load_all_models"]
