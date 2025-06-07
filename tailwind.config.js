
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      darkNavy: '#003135',
      tealNavy: '#024950',
      reddishBrown: '#964734',
      cyan: '#0FA4AF',
      lightBlue: '#AFDDE5',
      white: 'FFFFFF'
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}
