/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'golos-text': ['Golos Text', 'sans-serif'],
      },
      fontSize: {
        xs: '0.8rem',
        xm: '1.2rem',
        xxl: '2.2rem',
      },
      colors: {
        'brand-grey': '#999999',
        'black-900': '#202020',
        'neutral-600': '#1F1F1F',
        'neutral-900': '#050505',
        'neutral-400': '#999999',
        'brand-blue': '#00BDDD',
        green: '#0FEDBE',
        red: '#F63D6B',
      },
    },
  },
};
