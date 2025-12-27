/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.05em' }],
        'sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.025em' }],
        'base': ['1rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'xl': ['1.25rem', { lineHeight: '1.5', letterSpacing: '0' }],
        '2xl': ['1.5rem', { lineHeight: '1.4', letterSpacing: '0' }],
        '3xl': ['1.875rem', { lineHeight: '1.3', letterSpacing: '0' }],
        '4xl': ['2.25rem', { lineHeight: '1.2', letterSpacing: '0' }],
        '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '0' }],
        '6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '0' }],
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
