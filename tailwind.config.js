/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xxs: "320px",
      xs: "480px",
      sm: "640px",
      md: "786px",
      mmd: "800px",
      lg: "1024px",
      wlg: "1023px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1700px",
    },

    extend: {},
    colors: {
      background_color: "#101828",
      blackAlpha: "rgba(0, 0, 0, 0.64)",
      chat_bg_color: "#344054",
      shadow: "rgba(16, 24, 40, 0.1)",
      shadow_btn: "rgba(16, 24, 40, 0.05)",
    },
    fontFamily: {
      plex: ["IBM Plex Sans"],
    },
  },

  plugins: [],
};
