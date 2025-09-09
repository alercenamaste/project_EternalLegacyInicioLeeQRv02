/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#2B2E35',
        gray: '#4E4F59',
        sage: '#8D9993',
        orange: '#FF7B0F',
      },
    },
  },
  plugins: [],
}