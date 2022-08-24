import { defineConfig } from "vite";

export default defineConfig({
  test: {
    include: ["src/**/*.ts"],
    setupFiles: ["scripts/setup.ts"],
    passWithNoTests: true,
  },
});
