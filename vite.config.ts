import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  test: {
    include: ["src/**/*{problem,solution,explainer}*.ts"],
    setupFiles: [path.resolve(__dirname, "scripts/setup.ts")],
    passWithNoTests: true,
    environment: "jsdom",
  },
  plugins: [tsconfigPaths()],
});
