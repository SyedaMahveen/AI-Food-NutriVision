
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: 'class', // optional: enables manual dark mode with a .dark class
  theme: {
    extend: {
      // custom tokens if needed
      colors: {
        brand: {
          50: '#f5f7ff',
          500: '#4f46e5'
        }
      }
    }
  },
  plugins: [
    // require('@tailwindcss/forms'), // uncomment if you install @tailwindcss/forms
  ]
};