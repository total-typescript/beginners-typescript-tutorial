const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");

const srcPath = path.resolve(__dirname, "../src");
const tsconfigPath = path.resolve(__dirname, "../tsconfig.json");

const [, , exercise] = process.argv;

if (!exercise) {
  console.log("Please specify an exercise");
  process.exit(1);
}

const allExercises = fs.readdirSync(srcPath);

let suffix = ".problem.ts";

if (process.env.SOLUTION) {
  suffix = ".solution.ts";
}

const exercisePath = allExercises.find(
  (exercisePath) =>
    exercisePath.startsWith(exercise) && exercisePath.endsWith(suffix),
);

if (!exercisePath) {
  console.log(`Exercise ${exercise} not found`);
  process.exit(1);
}

const exerciseFile = path.resolve(srcPath, exercisePath);

// One-liner for current directory
chokidar.watch(exerciseFile).on("all", (event, path) => {
  try {
    console.clear();
    console.log("Running tests...");
    execSync(`vitest run ${exerciseFile} --passWithNoTests`, {
      stdio: "inherit",
    });
    console.log("Checking types...");
    execSync(`tsc ${exerciseFile} --noEmit --strict`, {
      stdio: "inherit",
    });
    console.log("Typecheck complete. You finished the exercise!");
  } catch (e) {
    console.log("Failed. Try again!");
  }
});
