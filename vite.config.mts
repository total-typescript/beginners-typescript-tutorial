import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  test: {
    include: ["src/**/*{problem,solution,explainer}*.{ts,tsx}"],
    passWithNoTests: true,
    environment: "jsdom",
  },
  plugins: [tsconfigPaths()],
});
