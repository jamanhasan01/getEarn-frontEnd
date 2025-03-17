import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode:'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#01122E', // Blue
        secondary: '#f97316', // Orange
        success: '#4CAF50', // Green
        gold: '#FFD700', // Gold
        neutral: '#4A5568' // Dark Gray
      }
    },
  },
  plugins: [daisyui],

}
