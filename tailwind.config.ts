import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#0f0f0f",
        "soft-white": "#f8fafc",
        electric: "#3b82f6"
      },
      boxShadow: {
        glow: "0 0 25px rgba(59, 130, 246, 0.45)",
        "glow-soft": "0 0 45px rgba(59, 130, 246, 0.2)"
      },
      backgroundImage: {
        "blue-mesh":
          "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.2), transparent 46%), radial-gradient(circle at 80% 15%, rgba(99,102,241,0.16), transparent 42%), radial-gradient(circle at 50% 85%, rgba(56,189,248,0.17), transparent 44%)"
      }
    }
  },
  plugins: []
};

export default config;
