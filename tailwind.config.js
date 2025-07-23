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
        'Fajr': 'linear-gradient(360deg, #D6BDFF 0%, #3F7CE6 97.7%)',
        'Dhuhr': 'linear-gradient(177.67deg, #E77715 -6.24%, #FFE392 101.21%)',
        'Asr': 'linear-gradient(180deg, #006C5E -8.39%, #C9F3B3 103.29%)',
        'Maghrib': 'linear-gradient(360deg, #FF88A8 0%, #FF9452 100%)',
        'Isha': 'linear-gradient(0deg,#811dec -4.44%,#381079)',
      },
    },
  },
  plugins: [],
};




