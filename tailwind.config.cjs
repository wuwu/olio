/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx}",
  ],
  plugins: [require('daisyui')],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#a3e635', // lime-400 color
          dark: '#84cc16', // lime-500 for hover or darker shade
          light: '#6cb2eb', // Optional: lighter shade
        },
        'reseda_green': {
          DEFAULT: '#717744',
          100: '#17180e',
          200: '#2e301c',
          300: '#444829',
          400: '#5b6037',
          500: '#717744',
          600: '#99a15c',
          700: '#b3b985',
          800: '#ccd0ad',
          900: '#e6e8d6'
        },
        'white_smoke': {
          DEFAULT: '#eff1ed',
          100: '#30362a',
          200: '#606b54',
          300: '#909d82',
          400: '#c0c7b8',
          500: '#eff1ed',
          600: '#f3f4f1',
          700: '#f6f7f5',
          800: '#f9faf8',
          900: '#fcfcfc'
        },
        'drab_dark_brown': {
          DEFAULT: '#3c4323',
          100: '#0c0d07',
          200: '#181b0e',
          300: '#242815',
          400: '#30351c',
          500: '#3c4323',
          600: '#6c783f',
          700: '#9aab5f',
          800: '#bcc794',
          900: '#dde3ca'
        },
        'pearl': {
          DEFAULT: '#d2d2b1',
          100: '#31311c',
          200: '#626239',
          300: '#949455',
          400: '#b6b680',
          500: '#d2d2b1',
          600: '#dbdbc1',
          700: '#e4e4d0',
          800: '#edede0',
          900: '#f6f6ef'
        }
      },
      fontFamily: {
        bodoni: ['"Bodoni Moda"', "serif"],
      },
    }
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#a3e635", // Set DaisyUI primary color to lime-400
          "primary-focus": "#84cc16", // Set primary focus color (hover) to lime-500
          "primary-content": "#3c4323", // Text color on primary background
        },
      },
      "light", // Include default DaisyUI themes if needed
    ],
  },
};


