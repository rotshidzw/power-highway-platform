/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f6ff',
          100: '#d9e9ff',
          200: '#b0d2ff',
          300: '#7eb4ff',
          400: '#488cff',
          500: '#1c6bff',
          600: '#144fd0',
          700: '#0f3ea3',
          800: '#0c2d76',
          900: '#0a245c',
        },
      },
    },
  },
  plugins: [],
};
