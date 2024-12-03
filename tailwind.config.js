/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'search-icon': "url('./src/assets/images/Search.png')"
        'gradient-45': 'linear-gradient(to right bottom, #0e0e0e, #333);',
        'hero-image': 'url(/src/assets/images/hero_visual/hero_image.jpg)'
      }
    }
  },
  plugins: []
};
