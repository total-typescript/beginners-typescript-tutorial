const fs = require("fs");
const path = require("path");

/**
 * Adds a bunch of scripts, like e-01, e-02 to package.json
 * so that StackBlitz can run them programmatically via URL
 * commands
 */

const packageJsonPath = path.resolve(__dirname, "../package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const exercises = fs.readdirSync(path.resolve(__dirname, "../src"));
const exerciseFiles = exercises.filter((exercise) =>
  exercise.includes(".problem."),
);
const exerciseNames = exerciseFiles.map((exercise) => exercise.split("-")[0]);

const newPackageJson = Object.assign({}, packageJson);

newPackageJson.scripts = {
  ...packageJson.scripts,
};

exerciseNames.forEach((exercise) => {
  newPackageJson.scripts[`e-${exercise}`] = `yarn exercise ${exercise}`;
  newPackageJson.scripts[`s-${exercise}`] = `yarn solution ${exercise}`;
});

fs.writeFileSync(packageJsonPath, JSON.stringify(newPackageJson, null, 2));
