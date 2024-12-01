/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-45':'linear-gradient(to right bottom, #0e0e0e, #333);'
      }      
    }
  },
  plugins: []
};
