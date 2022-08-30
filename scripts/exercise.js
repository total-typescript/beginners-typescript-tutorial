const {execSync} = require("child_process");
const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");
const {buildNextExerciseNo, isEndOfTutorial} = require("./utils");

const srcPath = path.resolve(__dirname, "../src");
const tsconfigPath = path.resolve(__dirname, "../tsconfig.json");

const [, , exercise] = process.argv;


if (!exercise) {
  console.log("Please specify an exercise");
  process.exit(1);
}

const allExercises = fs.readdirSync(srcPath);

let pathIndicator = ".problem.";

if (process.env.SOLUTION === 'true') {
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

    if (process.send) {
      const consoleNextMessage = process.env.SOLUTION === 'true' ?
        `\nPress 'n' to go to exercise ${buildNextExerciseNo(exercise)}.` :
        `\nPress 'n' to see solution.`;

      const consolePrevMessage = (exercise !== '01' | process.env.SOLUTION === 'true') ?
        "\nOr press 'p' to go to previous step." : ""

      process.send({
        lessonIsCompleted: true,
        isSolution: process.env.SOLUTION,
        consoleNextMessage,
        consolePrevMessage
      });
    }
  } catch (e) {
    console.log("Failed. Try again!");
    if (process.send) {
      process.send({ 
        lessonIsCompleted: false, 
        isSolution: process.env.SOLUTION,
      });
    }
  }
});

process.on('message', (m) => {
  if (m && m.kill) {
    process.exit(0);
  }
});

//if (process.send) {
//  // Causes the parent to print: PARENT got message: { foo: 'bar', baz: null }
//  process.send({ foo: 'bar', baz: NaN });
//}
