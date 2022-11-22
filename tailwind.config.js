/** @type {import('tailwindcss').Config} */

const {theme} = require('@sanity/demo/tailwind')

module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme,
  plugins: [require('@tailwindcss/typography')],
}
