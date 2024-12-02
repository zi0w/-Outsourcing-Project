/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'search-icon': "url('./src/assets/images/Search.png')"
      }
    }
  },
  plugins: []
};
