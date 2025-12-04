# app/utils/api_clients.py
import requests

def query_openfoodfacts_by_barcode(barcode: str):
    url = f"https://world.openfoodfacts.org/api/v0/product/{barcode}.json"
    r = requests.get(url, timeout=10)
    if r.status_code == 200:
        return r.json().get("product")
    return None
