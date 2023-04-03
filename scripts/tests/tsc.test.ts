import fg from "fast-glob";
import path from "path";
import { describe, expect, it } from "vitest";
import { execSync } from "child_process";

const srcFolder = path.resolve(__dirname, "../../src");

const allFiles = path.resolve(srcFolder, "*{problem,solution,explainer}*.ts");

const toRelativeFilename = (file: string) => {
  return path.relative(srcFolder, file);
};

describe("tsc", async () => {
  const files = await fg(allFiles);

  it.each(files.map(toRelativeFilename))(
    "In file %s, TS errors should match snapshot",
    (file) => {
      const resolvedFile = path.join(srcFolder, file);
      let result: string;

      try {
        result = execSync(`tsc "${resolvedFile}" --noEmit --strict`).toString();
      } catch (error) {
        result = error.output.toString();
      }

      expect(result).toMatchSnapshot();
    },
  );
});
