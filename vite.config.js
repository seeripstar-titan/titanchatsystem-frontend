import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: false,
    },
  },

  // Show all Vite logs (default)
  logLevel: "info",

  resolve: {
    alias: {
      app: path.resolve(__dirname, "app"),
      features: path.resolve(__dirname, "features"),
      shared: path.resolve(__dirname, "shared"),
      services: path.resolve(__dirname, "services"),
      layouts: path.resolve(__dirname, "layouts"),
      assets: path.resolve(__dirname, "assets"),
      context: path.resolve(__dirname, "context"),
      pages: path.resolve(__dirname, "pages"),
    },
  },
});
