import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const path = require("path");

// https://vitejs.dev/config/UBUNTU
// export default defineConfig({
//   resolve: {
//     alias: [{ find: "@", replacement: path.resolve(__dirname, "/src") }],
//   },
//   plugins: [react()],
//   build: {
//     chunkSizeWarningLimit: 1600,
//   },
// });

// https://vitejs.dev/config/windows
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
