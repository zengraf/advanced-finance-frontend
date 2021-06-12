module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'display': ['Assistant'],
      'sans': ['Inter', 'sans-serif']
    },
    extend: {
      width: {
        'extended': 'calc(100% + 8rem)'
      }
    },
  },
  variants: {
    extend: {
      ringWidth: ['hover', 'active', 'group-focus'],
      ringColor: ['hover', 'active', 'group-focus'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
