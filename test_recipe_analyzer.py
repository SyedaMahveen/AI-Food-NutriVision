#!/usr/bin/env python3
"""Test script for Recipe Analyzer backend"""

import sys
sys.path.insert(0, r'c:\Users\Dell\Desktop\NutriSense\backend')

from app.services.nutrition_calc import analyze_recipe_text

# Test cases
test_cases = [
    "grilled chicken with brown rice and spinach",
    "milk and sugar",
    "samosa with dal",
    "tomato soup with olive oil",
    "",
]

print("Testing Recipe Analyzer Service...\n")
for test in test_cases:
    print(f"Input: '{test}'")
    result = analyze_recipe_text(test)
    print(f"Output: {result}")
    print("-" * 60)
