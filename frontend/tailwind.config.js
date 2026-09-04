/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ONE primary color. Used sparingly.
        brand: '#5B21B6',          // violet — CTAs, active states, links only
        'brand-light': '#F5F3FF',   // backgrounds only, very subtle

        // Neutrals — 90% of the UI lives here
        gray: {
          50:  '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
          900: '#18181B',
        },
        'gray-50':  '#FAFAFA',
        'gray-100': '#F4F4F5',
        'gray-200': '#E4E4E7',
        'gray-300': '#D4D4D8',
        'gray-400': '#A1A1AA',
        'gray-500': '#71717A',
        'gray-600': '#52525B',
        'gray-900': '#18181B',

        // Semantic
        success: '#16A34A',   // cashback ONLY
        warning: '#D97706',   // interest rate ONLY
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
      },
      fontSize: {
        xs:   ['11px', { lineHeight: '16px', letterSpacing: '0.02em' }],
        sm:   ['13px', { lineHeight: '20px' }],
        base: ['15px', { lineHeight: '24px' }],
        lg:   ['17px', { lineHeight: '26px', fontWeight: '500' }],
        xl:   ['20px', { lineHeight: '28px', fontWeight: '600' }],
        '2xl':['24px', { lineHeight: '32px', fontWeight: '700' }],
        '3xl':['30px', { lineHeight: '38px', fontWeight: '700' }],
      },
      spacing: {
        section: '48px',   // between major page sections
        card:    '24px',   // card internal padding
        gap:     '16px',   // between cards in a grid
      },
      borderRadius: {
        card: '20px',
        btn:  '12px',
        pill: '9999px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
      },
    },
  },
  plugins: [],
};
