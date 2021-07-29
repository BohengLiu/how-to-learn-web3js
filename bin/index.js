const { Command } = require("commander");
const pagJson = require("../package.json");
const childProcess = require("child_process");
const fs = require("fs");

function parseCommand() {
  // parse command option
  const program = new Command();
  program.version(pagJson.version);
  program
    .option("-d, --debug", "output extra debugging")
    .option("-p, --project <project-name>", "project to run");

  program.parse(process.argv);
  const options = program.opts();
  if (options.debug) console.log(options);
  return options;
}

function runScript(scriptPath, callback) {
  // keep track of whether callback has been invoked to prevent multiple invocations
  let invoked = false;

  const process = childProcess.fork(scriptPath);

  // listen for errors as they may prevent the exit event from firing
  process.on("error", function (err) {
    if (invoked) return;
    invoked = true;
    callback(err);
  });

  // execute the callback once the process has finished running
  process.on("exit", function (code) {
    if (invoked) return;
    invoked = true;
    const err = code === 0 ? null : new Error("exit code " + code);
    callback(err);
  });
}

function main() {
  const options = parseCommand();

  if (options.project) console.log(`run demo: ${options.project}`);

  const demoPath = `./demo/${options.project}.js`;

  if (!fs.existsSync(demoPath)) {
    console.log("demo not exists!");
    return;
  }

  try {
    runScript(demoPath, function (err) {
      if (err) throw err;
      console.log(`finished running ${options.project}.js`);
    });
  } catch (e) {
    console.log(e.code, e.message);
  }
}

main();
