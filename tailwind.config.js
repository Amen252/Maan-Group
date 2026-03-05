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
          900: '#0A192F',
          800: '#172A45',
        },
        gold: {
          500: '#C5A059',
          400: '#DFBD7D',
        },
        slate: {
          600: '#4B5563',
        },
      },
      fontFamily: {
        heading: ['"Poppins"', 'sans-serif'],
        body: ['"Poppins"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

