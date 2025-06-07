/** tailwind.config.js */
export default {
  content: ['./index.html','./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        slate: '#2C3531',   // dark slate
        teal:  '#116466',   // deep teal
        tan:   '#D9B08C',   // warm tan
        peach: '#FFCB9A',   // light peach
        mint:  '#D1E8E2',   // pale mint
      },
    },
  },
  plugins: [],
}