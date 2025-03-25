import { defineConfig } from "vitest/config"
import path from "path"

export default defineConfig({
  test: {
    // Other Vitest options
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Ensure this resolves to /src
    },
  },
})
