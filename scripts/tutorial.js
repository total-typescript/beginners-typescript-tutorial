const cp = require("node:child_process");
const { buildNextExerciseNo } = require("./utils");

let [, , exercise, sol] = process.argv;

let isSolution = sol === "s" ? "true" : "false";

let n = cp.fork(`${__dirname}/exercise.js`, [exercise], {
  env: { ...process.env, SOLUTION: isSolution },
});

n.on("message", (m) => {
  processMessage(m);
});

let lessonIsCompleted = false;

// Kill child process when parent exits
process.on("exit", () => {
  n.send({ kill: true });
});

var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding("utf8");
stdin.on("data", function (key) {
  // ctrl-c ( end of text )
  if (key === "\u0003") {
    process.exit();
  }

  if (key === "n" && lessonIsCompleted) {
    if (isSolution === "false") {
      isSolution = "true";
    } else {
      isSolution = "false";
      exercise = buildNextExerciseNo(exercise);
    }
    n.send({ kill: true });
    n = cp.fork(`${__dirname}/exercise.js`, [exercise], {
      env: { ...process.env, SOLUTION: isSolution },
    });

    n.on("message", (m) => {
      processMessage(m);
    });
  }

  if (key === "p" && (exercise !== "01" | isSolution === 'true')) {
    if (isSolution === "false") {
      isSolution = "true";
      exercise = parseInt(exercise) - 1;
      exercise = exercise < 10 ? `0${exercise}` : exercise;
    } else {
      isSolution = "false";
    }

    n.send({ kill: true });
    n = cp.fork(`${__dirname}/exercise.js`, [exercise], {
      env: { ...process.env, SOLUTION: isSolution },
    });
    n.on("message", (m) => {
      processMessage(m);
    });
  }

  //console.log('entered ->', key);
  // write the key to stdout all normal like
  // process.stdout.write( key );
});

function processMessage(m) {
  // console.log("processMessage", m);
  lessonIsCompleted = m.lessonIsCompleted;
  isSolution = m.isSolution;
  if (m.consoleNextMessage) {
    console.log(m.consoleNextMessage);
  }
  if (m.consolePrevMessage) {
    console.log(m.consolePrevMessage);
  }
}
