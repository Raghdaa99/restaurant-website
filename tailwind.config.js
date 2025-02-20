/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily:{
        Poppins: ['Poppins', 'sans-serif'],
        Salsa: ['Salsa', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
      },
      colors:{
        primary: '#F5C754',
        'primary-dark': '#EAB308',
        danger: '#f87171',
        gray: '#405473',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

