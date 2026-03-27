import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  // new part from hare
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          swiper: ["swiper"],
          icons: ["lucide-react"],
        },
      },
    },
  },

  // till thiss part

  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
