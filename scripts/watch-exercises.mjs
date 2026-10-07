import { spawn } from "node:child_process";
import { existsSync, watch } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const vitest = fileURLToPath(new URL("../node_modules/vitest/vitest.mjs", import.meta.url));

if (!existsSync(vitest)) {
  console.error("Dependencies are missing. Run npm install first.");
  process.exit(1);
}

const timers = new Map();
const pending = new Set();
let child;
let stopping = false;

function runNext() {
  if (child || stopping || pending.size === 0) return;

  const file = pending.values().next().value;
  pending.delete(file);
  if (!existsSync(new URL(`../src/${file}`, import.meta.url))) {
    runNext();
    return;
  }

  console.log(`\nRunning tests for src/${file}\n`);
  child = spawn(process.execPath, [vitest, "run", `src/${file}`], {
    cwd: root,
    stdio: "inherit",
  });
  child.on("error", (error) => console.error(error.message));
  child.on("close", () => {
    child = undefined;
    runNext();
  });
}

const watcher = watch(new URL("../src/", import.meta.url), (_event, filename) => {
  if (stopping || !filename?.endsWith(".problem.ts")) return;

  clearTimeout(timers.get(filename));
  timers.set(filename, setTimeout(() => {
    timers.delete(filename);
    pending.add(filename);
    runNext();
  }, 150));
});

function stop() {
  stopping = true;
  watcher.close();
  for (const timer of timers.values()) clearTimeout(timer);
  pending.clear();
  child?.kill("SIGTERM");
}

watcher.on("error", (error) => {
  console.error(error.message);
  process.exitCode = 1;
  stop();
});
process.on("SIGINT", stop);
process.on("SIGTERM", stop);

console.log("Watching src/*.problem.ts. Save an exercise to run its tests. Press Ctrl+C to stop.");
