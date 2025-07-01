import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      { find: "buffer", replacement: "buffer" },
      { find: "crypto", replacement: "crypto-browserify" },
      { find: "process", replacement: "process/browser" },
      { find: "stream", replacement: "stream-browserify" },
      { find: "util", replacement: "util" },
      { find: "https", replacement: "https-browserify" },
      { find: "http", replacement: "stream-http" }
    ]
  },
  define: {
    global: "globalThis",
    "process.env": {}
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis"
      }
    },
    include: ["buffer", "process", "https-browserify", "stream-http"]
  },
  server: {
    proxy: {
      "/api": {
        target: "https://test-api.dolla.market",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "/api")
      }
    }
  }
});
