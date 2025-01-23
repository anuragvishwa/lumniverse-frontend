import type { Config } from "tailwindcss";
import sharedConfig from "tailwind-config"; // Import shared configuration

const config: Pick<Config, "prefix" | "presets" | "content" | "plugins"> = {
  content: [
    "./src/**/*.tsx",
    "./node_modules/rizzui/dist/*.{js,ts,jsx,tsx}", // Ensures RizzUI components are styled
  ],
  plugins: [require("@tailwindcss/typography")], // Adds the Typography plugin
  presets: [sharedConfig], // Using shared config for common settings
};

export default config;
