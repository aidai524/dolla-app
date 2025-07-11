/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        alfa: ["AlfaSlabOne"],
        blackHan: ["BlackHanSans"]
      },
      transitionDuration: {
        600: "600ms"
      }
    }
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".preserve-3d": {
          "transform-style": "preserve-3d"
        },
        ".backface-hidden": {
          "backface-visibility": "hidden"
        }
      };
      addUtilities(newUtilities);
    }
  ]
};
