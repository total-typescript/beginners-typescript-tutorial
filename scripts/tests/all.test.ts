import path from "path";
import { describe, expect, it } from "vitest";
import { execSync } from "child_process";
import { cleanVitestOutput } from "./cleanVitestOutput";

const rootFolder = path.resolve(__dirname, "../..");

describe("tsc", async () => {
  it("Should have the correct TypeScript errors", () => {
    let result: string;

    try {
      result = execSync(`npx tsc`, {
        cwd: rootFolder,
      }).toString();
    } catch (error) {
      result = error.output.toString();
    }

    expect(result).toMatchSnapshot();
  });
});

describe("vitest", async () => {
  it("Should have the correct Vitest errors", () => {
    let result: string;

    try {
      result = execSync(`npx vitest run --reporter=json`, {
        cwd: rootFolder,
        stdio: "pipe",
      }).toString();
    } catch (error) {
      result = error.output.toString();
    }

    expect(
      cleanVitestOutput(result, {
        rootFolder,
      }),
    ).toMatchSnapshot();
  });
});
