import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  build: { outDir: "dist" },
  assetsInclude: ["**/*.glb"],
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
    strictPort: !!process.env.PORT,
    // Uploaded images are stored as same-origin /api/uploads/... paths (nginx
    // proxies them in production); forward them to the local API in dev
    proxy: { "/api/uploads": "http://localhost:4000" },
  },
});
