import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*{problem,solution}*.ts"],
    setupFiles: ["./scripts/setup.ts"],
    passWithNoTests: true,
    teardownTimeout: 5000,
    environment: "jsdom",
  },
});
