/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: "#f5f5f5",
          },
        },
      },
    },
    textColor: {
      black: "#333333",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
