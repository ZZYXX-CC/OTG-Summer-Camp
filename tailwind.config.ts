/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        pakistan_green: {
          "50": "#f0fdf4",
          "100": "#dcfce7",
          "200": "#bbf7d0",
          "300": "#86efac",
          "400": "#4ade80",
          "500": "#22c55e",
          "600": "#16a34a",
          "700": "#15803d",
          "800": "#166534",
          "900": "#14532d",
          "950": "#052e16"
        },
        nyanza: {
          "50": "#f3fef3",
          "100": "#e5fee5",
          "200": "#bffcc0",
          "300": "#85f788",
          "400": "#47eb4d",
          "500": "#1fd626",
          "600": "#13b119",
          "700": "#138916",
          "800": "#156c17",
          "900": "#145915",
          "950": "#053207"
        },
        india_green: {
          "50": "#f0fdf4",
          "100": "#dcfce7",
          "200": "#bbf7d0",
          "300": "#86efac",
          "400": "#4ade80",
          "500": "#22c55e",
          "600": "#16a34a",
          "700": "#15803d",
          "800": "#166534",
          "900": "#14532d",
          "950": "#052e16"
        },
        light_green: {
          "50": "#f7fee7",
          "100": "#ecfccb",
          "200": "#d9f99d",
          "300": "#bef264",
          "400": "#a3e635",
          "500": "#84cc16",
          "600": "#65a30d",
          "700": "#4d7c0f",
          "800": "#3f6212",
          "900": "#365314",
          "950": "#1a2e05"
        },
        pigment_green: {
          "50": "#eefdf3",
          "100": "#d7fae3",
          "200": "#b2f4cb",
          "300": "#7be8aa",
          "400": "#3fd583",
          "500": "#1db868",
          "600": "#139751",
          "700": "#127843",
          "800": "#135f37",
          "900": "#124e2f",
          "950": "#052e16"
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        aurora: {
          "0%": { 
            transform: "translate(0, 0) scale(1.0)",
            opacity: "0.5"
          },
          "50%": {
            opacity: "0.75"
          },
          "100%": { 
            transform: "translate(100px, 50px) scale(1.4)",
            opacity: "0.5"
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "aurora-slow": "aurora 15s ease-in-out infinite alternate",
        "aurora-medium": "aurora 12s ease-in-out infinite alternate-reverse",
        "aurora-fast": "aurora 10s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
