/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        findlyBg: '#F8FAFC',
        findlySurface: '#FFFFFF',
        findlyTextPrimary: '#0F172A',
        findlyTextSecondary: '#475569',
        findlyBlue: '#38BDF8',
        findlyCyan: '#06B6D4',
        findlyBorder: '#E2E8F0',
        findlySuccess: '#22C55E',
        findlyWarning: '#F59E0B',
        findlyDanger: '#EF4444',
        // Also add standard semantic names for easy access
        brandPrimary: '#38BDF8',
        brandSecondary: '#06B6D4',
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 23, 42, 0.04), 0 2px 8px -1px rgba(15, 23, 42, 0.02)',
        'premium': '0 12px 30px -4px rgba(15, 23, 42, 0.06), 0 4px 12px -2px rgba(15, 23, 42, 0.03)',
        'premium-hover': '0 20px 40px -4px rgba(15, 23, 42, 0.1), 0 8px 20px -4px rgba(15, 23, 42, 0.05)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #38BDF8 0%, #06B6D4 100%)',
      }
    },
  },
  plugins: [],
}
