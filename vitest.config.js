import { defineConfig } from "vitest/config"
import path from "path"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
  test: {
    environment: "jsdom", // This ensures jsdom is used in your tests
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Ensure this resolves to /src
    },
  },
  plugins: [vue()],
})
