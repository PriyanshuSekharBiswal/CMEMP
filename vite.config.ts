import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { existsSync } from "node:fs";
if (existsSync(".env")) process.loadEnvFile(".env");
export default defineConfig({
  root: "apps/web",
  plugins: [react()],
  server: {
    port: Number(process.env.WEB_PORT || 5184),
    strictPort: true,
    proxy: { "/api": `http://127.0.0.1:${process.env.PORT || 3104}` },
  },
  build: { outDir: "../../dist", emptyOutDir: true },
});
