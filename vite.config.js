import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),

    // Log every incoming request
    {
      name: "request-logger",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const start = Date.now();

          res.on("finish", () => {
            console.log(
              `[${new Date().toLocaleTimeString()}] ${res.statusCode} ${req.method} ${req.url} (${Date.now() - start}ms)`,
            );
          });

          next();
        });
      },
    },
  ],

  server: {
    hmr: {
      overlay: false,
    },
  },

  // Show all Vite logs
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
