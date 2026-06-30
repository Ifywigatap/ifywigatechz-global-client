/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brandBlue: "#2D7FBF",
        brandSteel: "#C7D3E0",
        brandGold: "#DAA520",
        wigablack: "#0a0a0a",
        // About enhancements
        aboutBlue: "#1e3a8a",
        aboutGradient: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #1d4ed8 100%)",
        surface: {
          DEFAULT: '#0F172A',
          glass: 'rgba(255, 255, 255, 0.03)',
          glassHover: 'rgba(255, 255, 255, 0.08)',
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.1)',
          highlight: 'rgba(45, 127, 191, 0.3)',
        }
      },
      boxShadow: { 
        soft: "0 8px 30px rgba(0,0,0,0.25)",
        aboutGlow: "0 0 20px rgba(59, 130, 246, 0.3)",
      },
      borderRadius: { 
        xxl: "1.25rem",
        aboutCard: "1rem"
      },
      animation: {
        'about-float': 'aboutFloat 3s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        aboutFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        }
      }
    },
  },
  plugins: [],
}
    