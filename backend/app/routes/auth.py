# app/routes/auth.py
# app/routes/auth.py

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from app.database import get_session
from app.models.user import UserCreate, LoginRequest
from app.services.auth_service import create_user, authenticate_user

router = APIRouter()

@router.post("/register")
def register(payload: UserCreate, session: Session = Depends(get_session)):
    print(f"DEBUG: Registering user: {payload.username}, {payload.email}")
    try:
        user = create_user(session, payload)
        if not user:
            print("DEBUG: User creation returned None (likely duplicate email)")
            raise HTTPException(status_code=400, detail="Email already used")
        print(f"DEBUG: User created successfully: {user.id}")
        return {"message": "User created", "user": user}
    except Exception as e:
        print(f"DEBUG: Error during registration: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/login")
def login(payload: LoginRequest, session: Session = Depends(get_session)):
    token = authenticate_user(session, payload.email, payload.password)
    if not token:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return {"token": token}