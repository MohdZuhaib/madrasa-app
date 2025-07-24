/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [ //using safelist so that they dont get purged in builds as they are being used dynamically
    'bg-Fajr',
    'bg-Dhuhr',
    'bg-Asr',
    'bg-Maghrib',
    'bg-Isha',
    'rounded-extra-round',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'sans-serif'], // Override default "sans"
      },
      colors: {
        primary: {
          500: '#8A57DC',
        },
      },
      borderRadius: {
        'extra-round': '16px',
      },
      boxShadow: {
        'custom-top': '0px -5px 20px 0px #00000008',
      },
      backgroundImage: {
        'header': 'linear-gradient(180deg, #F0EAFB -17.28%, #FFFFFF 78.01%)',
        'Fajr': 'linear-gradient(360deg, #D6BDFF 0%, #3F7CE6 97.7%)',
        'Dhuhr': 'linear-gradient(177.67deg, #E77715 -6.24%, #FFE392 101.21%)',
        'Asr': 'linear-gradient(180deg, #006C5E -8.39%, #C9F3B3 103.29%)',
        'Maghrib': 'linear-gradient(360deg, #FF88A8 0%, #FF9452 100%)',
        'Isha': 'linear-gradient(360deg, #811DEC -4.44%, #381079 100%)',
        'gradient-button': 'linear-gradient(35.2deg, #6D2DD3 -25.33%, #FBD2FF 156.54%)'
      },
    },
  },
  plugins: [],
};





