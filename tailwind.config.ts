import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],

  plugins: [
    function ({ addUtilities }: any) {
      const newUtilities = {
        ".avoid-break-inside": {
          "break-inside": "avoid",
          "page-break-inside": "avoid",
          overflow: "hidden", // Para garantir que o conteúdo não seja cortado
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
export default config;
