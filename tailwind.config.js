/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#062E79', // Requested primary blue
          800: '#04225A', // Darker shade for hovers/accents
        },
        gold: {
          500: '#F47321', // Primary Orange
          600: '#D65D1A', // Darker Orange for Hover
          400: '#FF8A45', // Lighter orange
        },
        slate: {
          600: '#4B5563',
        },
      },
      fontFamily: {
        heading: ['"Poppins"', 'sans-serif'],
        body: ['"Poppins"', 'sans-serif'],
        serif: ['"Poppins"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

