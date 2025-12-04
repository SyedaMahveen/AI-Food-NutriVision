# app/utils/helper.py
from datetime import datetime

def now_timestamp():
    return datetime.utcnow().isoformat()


def success_response(message: str, data=None):
    return {
        "success": True,
        "message": message,
        "data": data
    }


def error_response(message: str):
    return {
        "success": False,
        "message": message
    }
