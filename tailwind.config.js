/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium Navy + Burnt Orange Palette
        navy: {
          DEFAULT: '#172B4D',
          dark: '#0F1E36',
          light: '#243B5A',
          secondary: '#243B5A',
          50: '#F0F4F8',
          100: '#D9E2EC',
          800: '#243B5A',
          900: '#172B4D',
        },
        orange: {
          DEFAULT: '#E87532',
          primary: '#E87532',
          secondary: '#F59E5B',
          pale: '#FFF1E8',
          hover: '#D46222',
          dark: '#C85B1B',
          50: '#FFF1E8',
          100: '#FFE4D4',
          500: '#E87532',
          600: '#D46222',
        },
        page: '#F7F8FA',
        card: '#FFFFFF',
        'text-primary': '#202B3C',
        'text-secondary': '#718096',
        border: {
          DEFAULT: '#E5E7EB',
          subtle: '#F3F4F6',
          strong: '#D1D5DB',
        },
        success: {
          DEFAULT: '#16A36A',
          bg: '#ECFDF5',
          border: '#A7F3D0',
          text: '#16A36A',
        },
        // Clinical / Biomechanical Status Colors
        status: {
          normal: {
            text: '#16A36A',
            bg: '#ECFDF5',
            border: '#A7F3D0',
          },
          warning: {
            text: '#B45309',
            bg: '#FFFBEB',
            border: '#FDE68A',
          },
          critical: {
            text: '#B91C1C',
            bg: '#FEF2F2',
            border: '#FECACA',
          },
          neutral: {
            text: '#475569',
            bg: '#F8FAFC',
            border: '#E2E8F0',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 1px 3px 0 rgba(23, 43, 77, 0.04), 0 1px 2px -1px rgba(23, 43, 77, 0.04)',
        card: '0 1px 3px 0 rgba(23, 43, 77, 0.05), 0 1px 2px -1px rgba(23, 43, 77, 0.03)',
        'card-hover': '0 4px 12px 0 rgba(23, 43, 77, 0.08), 0 2px 4px -1px rgba(23, 43, 77, 0.04)',
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        sm: '0.375rem',
        md: '0.5rem',
        lg: '0.625rem',
        xl: '0.75rem',
      },
    },
  },
  plugins: [],
}
