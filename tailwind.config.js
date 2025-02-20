/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}", "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F5C754",
        "primary-light": "#fffbf3",
        secondary: "#ff4500",
      },
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        Salsa: ["Salsa", "sans-serif"]

      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('flowbite/plugin')
  ],
};