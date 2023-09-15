/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html'],
  theme: {
    extend: {
      colors: {
        'cream': '#f5f6e7',
        'green': '#749064',
        'dark-green': '#627a55',
        'sludge': '#656558',
        'clear-sludge': '#a3a496',
        'clear-gray': '#efefef',
      },
      backgroundImage: {
        'body-background': "url('/image/background-image.png')",
      },
      boxShadow: {
        'main-shadow': '-3px -3px 9px 0.1px #fff, 3px 3px 9px 0.1px #ccc',
        'cover-shadow': '15px 15px 30px -10px rgba(0, 0, 0, 0.15), -20px -20px 20px -10px white, -0.5px -0.5px 0 white, 0.5px 0.5px 0 rgba(0, 0, 0, 0.02)',
        'active-change': 'inset -3px -3px 5px 0.1px #fff, inset 3px 3px 5px 0.7px #ccc',
        'active-play': 'inset 4px 4px 6px -1px rgba(0, 0, 0, 0.2), inset -4px -4px 6px -1px rgba(255, 255, 255, 0.2)',
      },
      fontFamily: {
        'Montserrat-Bold': 'Montserrat-Bold',
        'Montserrat-Medium': 'Montserrat-Medium',
        'Montsrerat-Light': 'Montsrerat-Light',
      },
    },
  },
  plugins: [],
}

