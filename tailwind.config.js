/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./app/**/*.{js,jsx}",
    "./features/**/*.{js,jsx}",
    "./shared/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
    "./layouts/**/*.{js,jsx}",
    "./context/**/*.{js,jsx}",
    "./main.jsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "'Inter'",
          "-apple-system",
          "system-ui",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
      },
      colors: {
        titan: {
          bg: "var(--titan-bg)",
          card: "var(--titan-card-bg)",
          border: "var(--titan-card-border)",
          primary: "var(--titan-primary)",
          muted: "var(--titan-text-muted)",
          hover: "var(--titan-hover)",
        },
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "20px",
        "4xl": "24px",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        shimmer: "shimmer 2s linear infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translate3d(0, 20px, 0)",
            filter: "blur(4px)",
          },
          "100%": {
            opacity: "1",
            transform: "translate3d(0, 0, 0)",
            filter: "blur(0px)",
          },
        },
        fadeIn: {
          "0%": { opacity: "0", filter: "blur(4px)" },
          "100%": { opacity: "1", filter: "blur(0px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "glow-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 5px var(--titan-glow), 0 0 20px var(--titan-glow)",
          },
          "50%": {
            boxShadow: "0 0 15px var(--titan-glow), 0 0 40px var(--titan-glow)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
