/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  important: "#root",
  darkMode: 'selector',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'],
      },
      screens: {
        mobile_ls: {
            raw: '(max-height: 480px) and (max-width: 800px) and (orientation: landscape)',
            },
      },
    },
  },
  plugins: [],
}

