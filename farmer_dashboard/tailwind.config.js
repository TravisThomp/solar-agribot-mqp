/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./front-end/src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'white': '#FFFFFF',
        'light-gray': '#E8E8E8',
        'light-green': '#AAF8B0',
        'darker-green': '#8EF696',
        'dark-gray': '#707070',
        'data-gray': '#E4E4E473',
        'green': '#62BD69',
        'blue': '#756CFA',
        'red': '#FA6C9B'
      }
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
