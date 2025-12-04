# app/services/auth_service.py
# app/services/auth_service.py

from sqlmodel import Session, select
from app.models.user import User, UserCreate, UserRead
from passlib.hash import bcrypt
from jose import jwt, JWTError
from fastapi import Depends, HTTPException, status, Header
from app.database import get_session

SECRET_KEY = "change_this_to_a_strong_secret"
ALGORITHM = "HS256"


# ------------------ CREATE USER ------------------ #
def create_user(session: Session, payload: UserCreate):
    existing = session.exec(select(User).where(User.email == payload.email)).first()
    if existing:
        return None

    print(f"DEBUG: Password length: {len(payload.password)}")
    try:
        hashed = bcrypt.hash(payload.password)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Password processing failed. Length: {len(payload.password)}. Error: {str(e)}")

    user = User(
        username=payload.username,
        email=payload.email,
        hashed_password=hashed,
        age=payload.age,
        weight=payload.weight,
        height=payload.height,
        goal=payload.goal,
        allergies=payload.allergies,
    )

    session.add(user)
    session.commit()
    session.refresh(user)
    return user


# ------------------ LOGIN USER ------------------ #
def authenticate_user(session: Session, email: str, password: str):
    user = session.exec(select(User).where(User.email == email)).first()

    if not user:
        return None

    if not bcrypt.verify(password, user.hashed_password):
        return None

    token = jwt.encode({"sub": user.email}, SECRET_KEY, algorithm=ALGORITHM)
    return token


# ------------------ CURRENT USER ------------------ #
def get_current_user(
    authorization: str = Header(None),
    session: Session = Depends(get_session)
):
    if not authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing Authorization header"
        )

    try:
        scheme, _, token = authorization.partition(" ")
        if scheme.lower() != "bearer":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token scheme"
            )

        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")

        user = session.exec(select(User).where(User.email == email)).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found"
            )

        return user

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )