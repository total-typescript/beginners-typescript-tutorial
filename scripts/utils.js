const fs = require("fs");
const path = require("path");
const srcPath = path.resolve(__dirname, "../src");

const allExercises = fs.readdirSync(srcPath);

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

module.exports = {
  allExercises,
  buildNextExerciseNo,
  isEndOfTutorial
}
