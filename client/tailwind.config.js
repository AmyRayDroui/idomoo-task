module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      light: "#fff",
      blue: "#2F8EDD",
      dark: "#000",
      cardBg: "rgba(255,255,255,.2)",
      inputBg: "#8aacc6",
    },
    extend: {
      gridTemplateColumns: {},
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
