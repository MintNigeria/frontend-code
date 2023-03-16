const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  purge: ["./src/**/*.{html,ts}"],

  theme: {
    extend: {
      colors: {
        primaryBlue: "#0D47A1",
        tabBlue: "#F5F9FF",
        headerGray: "#101828",
        lightGray: "#667085",
        darkGray: "#101828",
        successLight: "#ECFDF3",
        successNormal: "#027A48",
        pendingNormal: "#DC6803",
        failedNormal: "#344054",
        danger: "#F04438",
        tableHeader: "#F9FAFB",
        buttonBlue: "#4086EF",
        borderLightGray: "#EFF0F6",
        failedLight: "#FEF3F2",
        failedDark: "#B42318",
        grayWhite: "#D0D5DD",
        tinyBlack: "#010001",
        grayScaleAsh:"#232A38",
        lightBlue: "#EBF2FE",
        borderlightBlue: "#BDD5FA",
        discountBlue: '#1059C6',
        discountBg: "#D7E7FE",
        failedDark: "#D92D20",

      },
      fontFamily: {
        sans: ["Open Sans"],
        nunito: ["Nunito"],
        inter: ["Inter"],
        poppins: ["Poppins"],
        avenir: ["Avenir"],
      },
      borderWidth: {
        1.5: "1.5px",
      },
    },
  },
  plugins: [require("daisyui")],
};
