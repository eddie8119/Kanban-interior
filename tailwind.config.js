const { gray } = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter var"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
  theme: {
    extend: {
      colors: {
        main: '#303030',
        'main-gray': '#f3f3f3',
        funsugarMain: '#ffcc00',
        'gray-text': '#bdbdbd',
      },
      minHeight: {
        innerPage: 'calc(100vh-70px)',
        'innerPage-mobile': 'calc(100vh - 106px)',
      },
      backgroundImage: {
        'funsugarMain-gradient':
          'linear-gradient(to right, #ffcc00, #231d1d 89%, #2f2525)',
      },
      boxShadow: {
        'main-box-shadow': '0px 0px 24px rgba(0, 0, 0, 0.15)',
      },
    },
  },
}
