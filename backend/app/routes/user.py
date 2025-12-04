# app/routes/user.py

from fastapi import APIRouter, Depends
from app.services.auth_service import get_current_user

router = APIRouter()

@router.get("/me")
def get_profile(user=Depends(get_current_user)):
    return user
