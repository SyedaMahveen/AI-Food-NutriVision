# app/utils/validators.py
import re
from fastapi import HTTPException

def validate_email(email: str):
    pattern = r"^[\w\.-]+@[\w\.-]+\.\w+$"
    if not re.match(pattern, email):
        raise HTTPException(status_code=400, detail="Invalid email format")
    return True


def validate_password(password: str):
    if len(password) < 6:
        raise HTTPException(
            status_code=400,
            detail="Password must be at least 6 characters"
        )
    return True


def validate_file_size(file_bytes: bytes, max_mb=5):
    if len(file_bytes) > max_mb * 1024 * 1024:
        raise HTTPException(
            status_code=400,
            detail=f"File too large. Max allowed: {max_mb} MB"
        )
    return True
