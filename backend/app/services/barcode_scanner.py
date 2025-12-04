# app/services/barcode_scanner.py
import requests

def lookup_barcode(barcode: str):
    # use Open Food Facts API as example
    url = f"https://world.openfoodfacts.org/api/v0/product/{barcode}.json"
    r = requests.get(url, timeout=10)
    if r.status_code != 200:
        return {"error": "product not found"}
    data = r.json()
    return data.get("product", {})
