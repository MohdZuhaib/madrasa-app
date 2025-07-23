/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'sans-serif'], // Override default "sans"
      },
      borderRadius: {
        'extra-round': '16px',
      },
      backgroundImage: {
        'header': 'linear-gradient(180deg, #F0EAFB -17.28%, #FFFFFF 78.01%)',
        'Isha': 'linear-gradient(0deg,#811dec -4.44%,#381079)',
      },
    },
  },
  plugins: [],
};
