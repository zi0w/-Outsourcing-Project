/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-45-black': 'linear-gradient(to right bottom, #0e0e0e, #333);',
        'gradient-45-white': 'linear-gradient(to right bottom, #fff, #999);',
        'search-icon': 'url(/src/assets/images/Search.png)',
        'hero-image': 'url(/src/assets/images/hero_visual/hero_image.jpg)',
        'black-prev-arrow': 'url(/src/assets/images/icons/black_prev_arrow.png)',
        'black-next-arrow': 'url(/src/assets/images/icons/black_next_arrow.png)',
        'white-prev-arrow': 'url(/src/assets/images/icons/white_prev_arrow.png)',
        'white-next-arrow': 'url(/src/assets/images/icons/white_next_arrow.png)'
      }
    }
  },
  plugins: []
};
