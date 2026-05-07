import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    // Ensure React is bundled (no external dependencies)
    rollupOptions: {
      // Remove any external configurations that might exclude React
    }
  },
});