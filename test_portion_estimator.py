#!/usr/bin/env python3
"""Test script for Portion Estimator"""

import sys
sys.path.insert(0, r'c:\Users\Dell\Desktop\NutriSense\backend')

from app.services.portion_estimator import estimate_portion

# Simulate image bytes (would be real image data in actual use)
test_images = [
    ("pizza.jpg", b"fake_pizza_image_data"),
    ("apple.jpg", b"fake_apple_image_data"),
    ("chicken.jpg", b"fake_chicken_image_data"),
    ("rice.jpg", b"fake_rice_image_data"),
]

print("Testing Portion Estimator Service...\n")
for filename, img_bytes in test_images:
    print(f"Input: {filename}")
    result = estimate_portion(img_bytes, filename)
    print(f"Food: {result['food_name']}")
    print(f"Portion: {result['estimated_portion_grams']}g - {result['estimated_portion_description']}")
    print(f"Nutrition: {result['estimated_calories']} cal, P:{result['protein_g']}g, C:{result['carbs_g']}g, F:{result['fat_g']}g")
    print("-" * 60)
