const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");

let [, , exercise] = process.argv;

let lessonIsCompleted = false;

runExercise(exercise);

function runExercise (exercise) {

const srcPath = path.resolve(__dirname, "../src");
const tsconfigPath = path.resolve(__dirname, "../tsconfig.json");


if (!exercise) {
  console.log("Please specify an exercise");
  process.exit(1);
}

const allExercises = fs.readdirSync(srcPath);

let pathIndicator = ".problem.";

if (process.env.SOLUTION) {
  pathIndicator = ".solution.";
}

const exercisePath = allExercises.find(
  (exercisePath) =>
    exercisePath.startsWith(exercise) && exercisePath.includes(pathIndicator),
);

if (!exercisePath) {
  console.log(`Exercise ${exercise} not found`);
  process.exit(1);
}

const exerciseFile = path.resolve(srcPath, exercisePath);

// One-liner for current directory
chokidar.watch(exerciseFile).on("all", (event, path) => {
  const fileContents = fs.readFileSync(exerciseFile, "utf8");

  const containsVitest = fileContents.includes("vitest");
  try {
    console.clear();
    if (containsVitest) {
      console.log("Running tests...");
      execSync(`vitest run ${exerciseFile} --passWithNoTests`, {
        stdio: "inherit",
      });
    }
    console.log("Checking types...");
    execSync(`tsc ${exerciseFile} --noEmit --strict`, {
      stdio: "inherit",
    });
    console.log(`Typecheck complete. You finished the ${exercise} exercise!`);
    console.log("\nPress 'n' to go to next exercise.");
    lessonIsCompleted = true;
  } catch (e) {
    console.log("Failed. Try again!");
    lessonIsCompleted = false;
  }
});
}


// Most of this code is stolen from https://stackoverflow.com/a/12506613/4990125
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

stdin.on('data', function (key) {
  // ctrl-c ( end of text )
  if (key === '\u0003') {
    process.exit();
  }

  if (key === 'n' && lessonIsCompleted) {
    exercise = parseInt(exercise) + 1;
    exercise = exercise < 10 ? `0${exercise}` : exercise;
    runExercise(exercise);
  }
  
  if (key === 'p') {
    exercise = parseInt(exercise) - 1;
    exercise = exercise < 10 ? `0${exercise}` : exercise;
    runExercise(exercise);
  }
});
