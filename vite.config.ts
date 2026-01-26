import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist-react",
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});
