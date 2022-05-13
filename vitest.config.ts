/// <reference types="vitest" />
import { alias } from "./alias";
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    globals: true,
    environment: "happy-dom",
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
  resolve: {
    alias,
  },
});
