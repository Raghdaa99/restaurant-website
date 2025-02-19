/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily:{
        Poppins: ['Poppins', 'sans-serif'],
        Salsa: ['Salsa', 'sans-serif']
      },
      colors:{
        primary: '#F5C754'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

