/** @type {import('tailwindcss').Config} */
// import 'tailwindcss-bg-patterns';

const config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sedgwick: ["Sedgwick Ave Display", "Inter"],
        racing: ["Racing Sans One", "Inter"],
        orbiter: ["TASA Orbiter", "Inter"],
        hanken: ["Hanken Grotesk", "Inter"],
        general: ["General Sans", "Inter"],
        azeret: ["Azeret Mono", "Inter"],
        clash: ["Clash Grotesk", "Inter"],
        satoshi: ["Satoshi", "Inter"],
      },
      colors: {
        gpt: "#f97316",
        gptLight: "#ff842e",
        gptLighter: "#ff944a",
        gptLightest: "#ffb17b",
        gptDark: "#e1650e",
        gptDarker: "#c5570a",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  plugins: [require("tailwindcss-bg-patterns")],
};

module.exports = config;
