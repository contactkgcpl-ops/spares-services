export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#f47c20',
        surface: '#0f172a',
        panel: '#111827',
        text: '#e2e8f0'
      },
      boxShadow: {
        soft: '0 18px 50px rgba(15, 23, 42, 0.18)'
      }
    }
  },
  plugins: []
};
