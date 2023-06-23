#!/usr/bin/env node
const { execSync, exec, spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

checkArgs();

const args = process.argv.slice(2);
const projectName = args[0];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const GIT_REPO_URL = "https://github.com/fatihgozenc/create-zen-react-app";

main();

async function main() {
  checkDir();
  try {
    console.log("Checking package managers...");
    const yarn = await execute("yarn --version");
    const isVersion = /^(\*|\d+(\.\d+){0,2}(\.\*)?)$/g;
    const hasYarn = yarn.match(isVersion).pop();
    const npm = await execute("npm --version");
    const hasNpm = npm.match(isVersion).pop();
    if (!hasNpm) {
      throw "You need to install NPM or Yarn for package installs.";
    }
    console.log("Downloading files...");
    execSync(`git clone --depth 1 ${GIT_REPO_URL} ${projectPath}`);

    editPackageJson(projectPath);

    process.chdir(projectPath);
    console.log("Installing dependencies...");

    const installer = spawn(hasYarn ? "yarn" : "npm install", {
      stdio: "inherit",
    });
    installer.on("exit", () => {
      console.log("Dependencies installed.");
      console.log(`Clearing leftovers...`);
      deleteFolderRecursive("./.git");
      fs.rmSync(path.join(projectPath, ".npmignore"));
      fs.rmSync(path.join(projectPath, "docs"), {
        recursive: true,
        force: true,
      });
      fs.rmSync(path.join(projectPath, "bin"), {
        recursive: true,
        force: true,
      });
      fs.rmSync(path.join(projectPath, ".npmignore"), {
        recursive: true,
        force: true,
      });
      execSync(`git init`);
      console.log("Installation is done, ready to zen!");
      console.log("");
      console.log(
        `Just run "cd ${projectName} && ${
          hasYarn ? "npm run" : "yarn"
        } dev" to start development!`
      );
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

function deleteFolderRecursive(path) {
  var files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach(function (file, index) {
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.rmSync(curPath);
      }
    });
    fs.rmSync(path, { recursive: true, force: true });
  }
}

function checkArgs() {
  if (process.argv.length < 3) {
    console.log("You have to provide a name to your app.");
    console.log("For example :");
    console.log("    npx create-zen-app my-app");
    process.exit(1);
  }
}

function checkDir() {
  try {
    fs.mkdirSync(projectPath);
  } catch (err) {
    if (err.code === "EEXIST") {
      console.log(
        `The file ${projectName} already exist in the current directory, please give it another name.`
      );
    } else {
      console.log(error);
    }
    process.exit(1);
  }
}

async function execute(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout) => {
      if (error) reject(error);
      resolve(stdout.trim());
    });
  });
}

function omit(obj, ...keys) {
  const ret = {};
  let key;
  for (key in obj) {
    if (!keys.includes(key)) {
      ret[key] = obj[key];
    }
  }
  return ret;
}

function editPackageJson(projectPath) {
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(projectPath, "package.json"), "utf8")
  );
  const newPackageJson = omit(packageJson, "repository", "bin");
  fs.writeFileSync(
    path.join(projectPath, "package.json"),
    JSON.stringify(newPackageJson, null, 2)
  );
}
