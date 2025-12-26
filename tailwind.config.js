/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Playfair Display', 'Cinzel', 'serif'],
        'sans': ['Inter', 'Poppins', 'sans-serif'],
      },
      colors: {
        'gold': {
          50: '#fffef5',
          100: '#fffde5',
          200: '#fff9c4',
          300: '#fff59d',
          400: '#ffeb3b',
          500: '#ffd700',
          600: '#ffc107',
          700: '#ffa000',
          800: '#ff8f00',
          900: '#ff6f00',
        },
        'luxury': {
          'black': '#1a1a1a',
          'gold': '#d4af37',
          'white': '#fafafa',
        }
      },
      boxShadow: {
        'luxury': '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 40px rgba(212, 175, 55, 0.1)',
        'gold-glow': '0 0 30px rgba(212, 175, 55, 0.5)',
      },
    },
  },
  plugins: [],
}
