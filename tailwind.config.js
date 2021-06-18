module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'display': ['Assistant'],
      'wide': ['Poppins', 'sans-serif'],
      'sans': ['Inter', 'sans-serif'],
      'mono': ['Fira Mono', 'monospace']
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
