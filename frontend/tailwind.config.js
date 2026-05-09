module.exports = {
  purge: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        navy: '#081f3c',
        ocean: '#1e3a6d',
        sky: '#7fa9e4',
        smoke: '#f2f4f8',
        accent: '#0f4cad',
      },
      boxShadow: {
        panel: '0 20px 60px rgba(8, 31, 60, 0.15)',
      },
      backgroundImage: {
        'gov-gradient': 'linear-gradient(135deg, #091735 0%, #103264 40%, #1f4a8f 100%)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
