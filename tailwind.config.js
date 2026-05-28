export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        panini: {
          900: '#081128',
          800: '#111c39',
          700: '#1c2b51',
          500: '#4867d6',
          400: '#6e82f2'
        },
        album: {
          DEFAULT: '#A27C39',
          light: '#d6b87d'
        }
      },
      boxShadow: {
        soft: '0 24px 80px rgba(15, 23, 42, 0.12)'
      }
    }
  },
  plugins: []
};
