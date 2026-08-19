/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        olivo: {
          DEFAULT: '#6B7B3C',
          claro: '#8A9A5B',
          oscuro: '#4A5530',
        },
        ostion: {
          DEFAULT: '#F5F0E8',
          oscuro: '#E8E0D4',
        },
        marfil: '#FAFAF7',
        oro: {
          DEFAULT: '#C9A962',
          claro: '#E8D5A3',
          oscuro: '#A8893A',
        },
      },
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'serif'],
        vibes: ['"Great Vibes"', 'cursive'],
      },
    },
  },
  plugins: [],
};
