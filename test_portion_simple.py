import sys
sys.path.insert(0, r'c:\Users\Dell\Desktop\NutriSense\backend')

from app.services.portion_estimator import estimate_portion

# Test with filenames that will match food detection
test_foods = ['pizza.jpg', 'apple.jpeg', 'chicken.png', 'rice.jpg', 'samosa.jpg']

print("Testing Portion Estimator with Filename Detection\n")
for filename in test_foods:
    result = estimate_portion(b'image_data', filename)
    food = result["food_name"]
    portion = result["estimated_portion_grams"]
    desc = result["estimated_portion_description"]
    cal = result["estimated_calories"]
    prot = result["protein_g"]
    carbs = result["carbs_g"]
    fat = result["fat_g"]
    
    print(f"Filename: {filename}")
    print(f"Detected: {food}")
    print(f"Portion: {portion}g - {desc}")
    print(f"Nutrition: {cal} cal | P:{prot}g C:{carbs}g F:{fat}g")
    print("-" * 60)
