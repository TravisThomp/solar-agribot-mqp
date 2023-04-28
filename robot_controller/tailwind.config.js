/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-purple': '#1C1C27',
        'medium-purple': '#28293D',
        'light-purple': '#3F4060',
        'error-red': '#FF7171',
        'info-white': '#DCDCDC',
        "dark-gray": "#33333E",
        "transparent-white": "#56565D",
        "transparent-red": "#60353D"
      },
    },
  },
  plugins: [
    plugin(function({ addBase, theme }) {
      addBase({
        'h1': { fontSize: theme('fontSize.3xl') },
        'h2': { fontSize: theme('fontSize.2xl') },
        'h3': { fontSize: theme('fontSize.xl') },
      })
    })
  ],
}
