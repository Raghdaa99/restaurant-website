/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}", "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
colors: {
        primary: "#ff8c00",
        "primary-light": "#fffbf3",
        secondary: "#ff4500",
        "primary-dark": "#EAB308",
        danger: "#f87171",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        salsa: ["Salsa", "sans-serif"],
        "space-grotesk": ["Space Grotesk", "sans-serif"], // تمت إضافته من `tareq-add-font`
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('flowbite/plugin')
  ],
};