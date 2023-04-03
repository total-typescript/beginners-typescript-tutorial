import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["../setup.ts"],
    passWithNoTests: true,
    teardownTimeout: 5000,
    environment: "jsdom",
  },
});
