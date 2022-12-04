const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");

const srcPath = path.resolve(__dirname, "../src");
const tsconfigPath = path.resolve(__dirname, "../tsconfig.json");

const [, , exerciseInput] = process.argv;
const isAutoNext = process.env.npm_config_auto_next === 'true';

if (!exerciseInput) {
  console.log("Please specify an exercise");
  process.exit(1);
}

const allExercises = fs.readdirSync(srcPath);

let pathIndicator = ".problem.";

if (process.env.SOLUTION) {
  pathIndicator = ".solution.";
}

startExercise(exerciseInput);

function findExercise (exercise) {
  return allExercises.find(
    (exercisePath) =>
      exercisePath.startsWith(exercise) && exercisePath.includes(pathIndicator),
  );
}

function startExercise (exercise) {
  const exercisePath = findExercise(exercise);
  
  if (!exercisePath) {
    console.log(`Exercise ${exercise} not found`);
    process.exit(1);
  }

  const exerciseFile = path.resolve(srcPath, exercisePath);

  // One-liner for current directory
  const watcher = chokidar.watch(exerciseFile).on("all", (event, path) => {
    const fileContents = fs.readFileSync(exerciseFile, "utf8");

    const containsVitest = fileContents.includes("vitest");
    try {
      console.clear();
      if (containsVitest) {
        console.log("Running tests...");
        execSync(`vitest run "${exerciseFile}" --passWithNoTests`, {
          stdio: "inherit",
        });
      }
      console.log("Checking types...");
      execSync(`tsc "${exerciseFile}" --noEmit --strict`, {
        stdio: "inherit",
      });
      console.log("Typecheck complete. You finished the exercise!");

      if (!isAutoNext) return;

      // get the next exercise number
      let nextExercise = Number(exercise) + 1;
      nextExercise = nextExercise >= 10 ? String(nextExercise) : `0${nextExercise}`;

      if (findExercise(nextExercise)) {
        // close current file watch
        watcher.close();
        console.log(`The next exercise ${nextExercise} is coming in 5s.`);
        setTimeout(() => startExercise(nextExercise), 5000);
      } else {
        console.log("🎉 Congratulations! You finished all the exercises!");
        // all the exercises finished, then exit the process
        process.exit(0);
      }
    } catch (e) {
      console.log("Failed. Try again!");
    }
  });
}

