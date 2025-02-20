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
        "primary-dark": "#EAB308",
        danger: "#f87171",
        // gray: "#405473",
      },
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        Salsa: ["Salsa", "sans-serif"],
        "space-grotesk": ["Space Grotesk", "sans-serif"], // تمت إضافته من `tareq-add-font`
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('flowbite/plugin')
  ],
};