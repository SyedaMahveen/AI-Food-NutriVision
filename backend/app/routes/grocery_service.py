# app/routes/grocery_service.py

from fastapi import APIRouter, Depends
from app.services.grocery_service import generate_grocery_list
from app.services.auth_service import get_current_user

router = APIRouter(prefix="/grocery", tags=["Grocery AI"])

@router.get("/list")
def grocery_list(current = Depends(get_current_user)):
    items = generate_grocery_list(current)
    return {"user": current.email, "items": items}
