export default {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
    "postcss-px-to-viewport": {
      unitToConvert: "px", // Unit to convert
      viewportWidth: 1512, // Viewport width of design draft, adjust based on actual UI design
      unitPrecision: 5, // Precision after unit conversion
      propList: ["*"], // Properties that can be converted to vw
      viewportUnit: "vw", // Desired viewport unit
      fontViewportUnit: "vw", // Font viewport unit
      selectorBlackList: [".no-vw", ".ignore-vw"], // CSS selectors to ignore
      minPixelValue: 1, // Minimum pixel value to convert
      mediaQuery: false, // Whether to convert units in media queries
      replace: true, // Replace property values directly instead of adding fallback properties
      exclude: [/node_modules/] // Exclude node_modules folder
    }
  }
};
