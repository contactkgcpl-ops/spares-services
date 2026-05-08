export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#d87f2a',
        accent: '#d87f2a',
        accentDark: '#b95f1c',
        surface: '#122136',
        panel: '#0f172a',
        text: '#25303b'
      },
      boxShadow: {
        soft: '0 18px 50px rgba(19, 20, 25, 0.12)'
      }
    }
  },
  plugins: []
};
