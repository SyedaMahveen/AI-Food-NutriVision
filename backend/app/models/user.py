
# app/models/user.py

from sqlmodel import SQLModel, Field
from typing import Optional
from pydantic import BaseModel, EmailStr


# ----------------------------------------------------
# Shared attributes (used by DB model + response model)
# ----------------------------------------------------
class UserBase(SQLModel):
    username: str
    email: str
    age: Optional[int] = None
    weight: Optional[float] = None
    height: Optional[float] = None
    goal: Optional[str] = None
    allergies: Optional[str] = None


# ----------------------------------------------------
# Database Model (actual SQL table)
# ----------------------------------------------------
class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    hashed_password: str


# ----------------------------------------------------
# Request model for Signup (user creation)
# ----------------------------------------------------
class UserCreate(UserBase):
    password: str


# ----------------------------------------------------
# Response model returned after creating/getting user
# ----------------------------------------------------
class UserRead(UserBase):
    id: int


# ----------------------------------------------------
# Request model for Login (email + password)
# ----------------------------------------------------
class LoginRequest(BaseModel):
    email: EmailStr
    password: str
