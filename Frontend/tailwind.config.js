// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      sm: '480px',
      md: '768px',
      lglg: '1024px',
      xl: '1280px',
      // custom range screen
      'custom-range': {'min': '830px', 'max': '1118px'},
    },
  },
  plugins: [],
}
