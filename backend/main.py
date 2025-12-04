# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Database
from app.database import create_db_and_tables

# Load ML Models (your .pkl + .keras)
from app.utils.load_models import load_all_models

# Routers
from app.routes.auth import router as auth_router
from app.routes.user import router as user_router
from app.routes.food import router as food_router
from app.routes.recipe import router as recipe_router
from app.routes.ai_models import router as ai_router
from app.routes.barcode import router as barcode_router
from app.routes.diet import router as diet_router
from app.routes.alerts import router as alerts_router
from app.routes.grocery import router as grocery_router
from app.routes.portion import router as portion_router


app = FastAPI(
    title="NutriSense AI Backend",
    description="AI-powered Nutrition & Food Intelligence Backend",
    version="1.0.0"
)

# ---------------------------------------------------------
# CORS
# ---------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # change in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------
# STARTUP EVENT (DATABASE + ML MODELS)
# ---------------------------------------------------------
@app.on_event("startup")
def on_startup():
    print("🚀 Starting backend…")
    create_db_and_tables()
    load_all_models()   # <-- loads nutrition_model.pkl, vectorizer.pkl, my_model.keras
    print("🔥 Backend ready with all ML models loaded.")


# ---------------------------------------------------------
# ROUTES
# ---------------------------------------------------------
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(user_router, prefix="/users", tags=["Users"])
app.include_router(food_router, prefix="/food", tags=["Food"])
app.include_router(recipe_router, prefix="/recipes", tags=["Recipes"])
app.include_router(ai_router, prefix="/ai", tags=["AI"])
app.include_router(barcode_router, prefix="/barcode", tags=["Barcode"])
app.include_router(diet_router, prefix="/diet", tags=["Diet"])
app.include_router(alerts_router, prefix="/alerts", tags=["Alerts"])
app.include_router(grocery_router, prefix="/grocery", tags=["Grocery"])
app.include_router(portion_router, prefix="/portion", tags=["Portion"])


@app.get("/")
def root():
    return {"message": "NutriSense backend running"}

# Trigger reload for DB recreation - Attempt 3