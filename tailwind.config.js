/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        godlike: {
          green: '#00C46A',
          blue: '#0077FF',
          cyan: '#00E5FF',
        },
      },
    },
  },
  plugins: [],
}
