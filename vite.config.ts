import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        // Libraries change far less often than the site: in their own files,
        // a deploy only invalidates the app chunk in visitors' caches
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          motion: ["framer-motion"],
          i18n: ["i18next", "react-i18next"],
          forms: ["react-hook-form", "@hookform/resolvers", "zod"],
        },
      },
    },
  },
  assetsInclude: ["**/*.glb"],
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
    strictPort: !!process.env.PORT,
    // Uploaded images are stored as same-origin /api/uploads/... paths (nginx
    // proxies them in production); forward them to the local API in dev
    proxy: { "/api/uploads": "http://localhost:4000" },
  },
});
