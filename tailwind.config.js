/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      keyframes: {
        fanLeft1: {
          '0%': { transform: 'translateY(-50%) rotate(0deg)' },
          '100%': { transform: 'translateY(-50%) rotate(-15deg)' },
        },
        fanLeft2: {
          '0%': { transform: 'translateY(-50%) rotate(0deg)' },
          '100%': { transform: 'translateY(-50%) rotate(-7deg)' },
        },
        fanRight1: {
          '0%': { transform: 'translateY(-50%) rotate(0deg)' },
          '100%': { transform: 'translateY(-50%) rotate(7deg)' },
        },
        fanRight2: {
          '0%': { transform: 'translateY(-50%) rotate(0deg)' },
          '100%': { transform: 'translateY(-50%) rotate(15deg)' },
        },
      },
      animation: {
        fanLeft1: 'fanLeft1 0.8s ease-out forwards',
        fanLeft2: 'fanLeft2 0.8s ease-out 0.1s forwards',
        fanRight1: 'fanRight1 0.8s ease-out 0.1s forwards',
        fanRight2: 'fanRight2 0.8s ease-out forwards',
      },
    
    },
  },
  plugins: [],
}