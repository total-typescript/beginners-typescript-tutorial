const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");

let [, , exercise] = process.argv;

const srcPath = path.resolve(__dirname, "../src");
const tsconfigPath = path.resolve(__dirname, "../tsconfig.json");
const allExercises = fs.readdirSync(srcPath);

let isSolution = process.env.SOLUTION ? process.env.SOLUTION : false;

let lessonIsCompleted = false;

runExercise(exercise, isSolution);

function runExercise (exercise, isSolution) {

if (!exercise) {
  console.log("Please specify an exercise");
  process.exit(1);
}

let pathIndicator = ".problem.";

if (isSolution) {
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
  
    if (isEndOfTutorial(exercise, isSolution, pathIndicator)) {
      console.log(`\n🎉 Cograts! You've reached to the end of this tutorial! 🎉  \n`);
      process.exit(0);
    }

    if (isSolution) {
      console.log(`\nPress 'n' to go to exercise ${buildNextExerciseNo(exercise)}.`);
    } else {
      console.log("\nPress 'n' to see solution.");
    }

    // if (exercise !== '01') {
    //   console.log("\nOr press 'p' to go to previous step.")
    // }

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
    if (isSolution === false) {
      isSolution = true
    } else {
      isSolution = false;
      exercise = buildNextExerciseNo(exercise)
    }
    
    runExercise(exercise, isSolution);
  }
  
  if (key === 'p' && exercise !== '01') {
    if (isSolution === false) {
      isSolution = true;
      exercise = parseInt(exercise) - 1;
      exercise = exercise < 10 ? `0${exercise}` : exercise;
    } else {
      isSolution = false;
    }
    
    runExercise(exercise, isSolution);
  }
});

function buildNextExerciseNo(exercise) {
  let exerciseCopy = exercise;
  exerciseCopy = parseInt(exercise) + 1;
  exerciseCopy = exerciseCopy < 10 ? `0${exerciseCopy}` : exerciseCopy;
  return exerciseCopy;
}

function isEndOfTutorial(exercise, isSolution, pathIndicator) {

  if (isSolution === false) return false;

  const maybeNextExersiceNo = buildNextExerciseNo(exercise);

  const maybeExersicePath = allExercises.find(
    (exercisePath) =>
      exercisePath.startsWith(maybeNextExersiceNo) && exercisePath.includes(pathIndicator),
  );

  return maybeExersicePath === undefined 
}
