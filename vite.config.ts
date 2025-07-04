import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig(async () => {
  const plugins = [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),

    // ✅ Plugin to copy _redirects file after build
    {
      name: "copy-redirects",
      closeBundle() {
        const source = path.resolve(__dirname, "client/_redirects");
        const destination = path.resolve(__dirname, "dist/public/_redirects");

        if (fs.existsSync(source)) {
          fs.copyFileSync(source, destination);
          console.log("✅ _redirects copied to dist/public/");
        } else {
          console.warn("⚠️ _redirects file not found at client/_redirects");
        }
      },
    },
  ];

  return {
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client", "src"),
        "@shared": path.resolve(__dirname, "shared"),
        "@assets": path.resolve(__dirname, "attached_assets"),
      },
    },
    root: path.resolve(__dirname, "client"),
    build: {
      outDir: path.resolve(__dirname, "dist/public"),
      emptyOutDir: true,
    },
    server: {
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
  };
});
