const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");
const fg = require("fast-glob");
const tsconfig = require("../tsconfig.json");

const compilerOptions = Object.entries(tsconfig.compilerOptions)
  .map(([key, value]) => {
    if (typeof value === "boolean") {
      if (value) {
        return `--${key}`;
      }
      return "";
    }

    if (key === "paths") return "";

    if (Array.isArray(value)) {
      return `--${key} ${value.join(" ")}`;
    }

    return `--${key} ${JSON.stringify(value)}`;
  })
  .filter(Boolean)
  .join(" ");

const specialPaths = Object.keys(tsconfig.compilerOptions.paths || {});

const srcPath = path.resolve(__dirname, "../src");

const [, , exercise] = process.argv;

if (!exercise) {
  console.log("Please specify an exercise");
  process.exit(1);
}

const allExercises = fg.sync(
  path.join(srcPath, "**", "**.ts").replace(/\\/g, "/"),
);

let pathIndicator = ".problem.";

if (process.env.SOLUTION) {
  pathIndicator = ".solution.";
}

const exerciseFile = allExercises.find((e) => {
  const base = path.parse(e).base;
  return base.startsWith(exercise) && base.includes(pathIndicator);
});

if (!exerciseFile) {
  console.log(`Exercise ${exercise} not found`);
  process.exit(1);
}

// One-liner for current directory
chokidar.watch(exerciseFile).on("all", (event, path) => {
  const fileContents = fs.readFileSync(exerciseFile, "utf8");

  const containsVitest =
    fileContents.includes(`from "vitest"`) ||
    fileContents.includes(`from 'vitest'`);
  try {
    console.clear();
    if (containsVitest) {
      console.log("Running tests...");
      execSync(`vitest run "${exerciseFile}" --passWithNoTests`, {
        stdio: "inherit",
      });
    }

    if (specialPaths.some((p) => fileContents.includes(p))) {
      console.log(
        `Due to a TS limitation, type checking won't work from the CLI on this file.`,
      );
      console.log(`Instead, follow the red lines in your IDE!`);
    } else {
      console.log("Checking types...");
      const cmd = `tsc "${exerciseFile}" ${compilerOptions}`;
      execSync(cmd, {
        stdio: "inherit",
      });
      console.log("Typecheck complete. You finished the exercise!");
    }
  } catch (e) {
    console.log("Failed. Try again!");
  }
});
