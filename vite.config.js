import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "dist",
    rollupOptions: {
      // Remove any external configurations that might exclude Vue
    }
  },
});