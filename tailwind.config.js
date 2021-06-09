module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#E23E57",
        secondary: "#88304E",
        dark: "#311D3F",
      },
      transformOrigin: { 0: "0%" },
    },
    fontFamily: {
      coolvetica: "Coolvetica",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
