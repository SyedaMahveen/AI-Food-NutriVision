# GroceryAI Implementation Summary

## Features Implemented

### 1. **Shopping List Generator** 📋
- Parse meal plan descriptions (e.g., "Monday: Grilled chicken with brown rice")
- Automatically extract ingredients from meal names
- Generate categorized shopping list with:
  - Item name and quantity
  - Unit of measurement
  - Product category
  - Nutritional information (calories, protein)

### 2. **Cost Estimation** 💰
- Calculate total cost of shopping list
- Show per-item cost breakdown
- Display average cost per item
- Use realistic pricing database with ~25 common grocery items

### 3. **Diet Optimization** 🎯
- **Healthier Alternatives**: Suggest healthier swaps (e.g., white rice → brown rice, butter → olive oil)
- **Diet Recommendations**: 
  - Calorie tracking against user's daily goal
  - Protein intake analysis
  - Macro balance suggestions
  - Micronutrient diversity recommendations
- **Customizable Diet Goals**:
  - Daily calorie target
  - Macronutrient percentages (protein, carbs, fat)

---

## Food Database

The system includes a comprehensive food database with 20+ items covering:

### Categories:
- **Protein**: Chicken breast, eggs, lentils, black beans
- **Grains**: Rice, brown rice, pasta
- **Vegetables**: Spinach, broccoli, carrots, bell peppers, onions
- **Dairy**: Greek yogurt, milk, cheese
- **Oils & Condiments**: Olive oil, tomato sauce
- **Nuts & Legumes**: Almonds, lentils
- **Other**: Honey, garlic

Each item includes:
- Quantity and unit
- Price (USD)
- Nutrition facts (calories, protein, carbs, fat)

---

## API Endpoints

### POST `/api/grocery/shopping-list`
Generate shopping list from meals
```json
{
  "meals": [
    "Monday: Grilled chicken with brown rice",
    "Tuesday: Spaghetti with tomato sauce"
  ]
}
```

### POST `/api/grocery/estimate-cost`
Calculate cost of items
```json
{
  "items": [...]
}
```

### POST `/api/grocery/optimize-diet`
Get diet optimization suggestions
```json
{
  "items": [...],
  "dietGoals": {
    "calories": 2000,
    "protein": 30,
    "carbs": 45,
    "fat": 25
  }
}
```

### GET `/api/grocery/suggest?query=protein`
Get suggestions for a category

---

## Frontend Components

### GroceryAI.jsx Features:
1. **Shopping List Tab**
   - Textarea for meal input (one per line)
   - Generate button
   - Display results in card grid
   - Quick action buttons for cost & diet optimization

2. **Cost Estimation Tab**
   - Shows total budget prominently
   - Itemized breakdown table
   - Average per-item calculation

3. **Diet Optimization Tab**
   - Customizable diet goals (calories, macros)
   - Healthier alternatives cards with reasons
   - Diet recommendations list
   - Estimated macro summary

---

## How to Use

1. **Enter your meals**: Type meals for the week in the Shopping List tab
   ```
   Monday: Grilled chicken with brown rice
   Tuesday: Spaghetti with tomato sauce
   Wednesday: Vegetable stir-fry
   ```

2. **Generate shopping list**: Click "Generate Shopping List"
   - System automatically extracts ingredients
   - Creates itemized list with quantities

3. **Check cost**: Click "Estimate Cost" to see total and breakdown

4. **Optimize diet**: 
   - Set your calorie and macro goals
   - Click "Optimize Diet"
   - Get healthier alternatives and recommendations

---

## Testing

To test the features:

1. Start backend:
   ```powershell
   cd c:\Users\Dell\Desktop\NutriSense\backend
   uvicorn main:app --reload
   ```

2. Start frontend:
   ```powershell
   cd c:\Users\Dell\Desktop\NutriSense\frontend
   npm run dev
   ```

3. Navigate to `/grocery-ai` and try the features

---

## Future Enhancements

- Integration with real food databases (OpenFoodFacts, USDA FoodData)
- Real-time price updates from grocery APIs
- Seasonal produce recommendations
- Recipe suggestions based on available items
- Store locator and coupon integration
- Export to grocery delivery apps
- Family meal planning with shared lists
