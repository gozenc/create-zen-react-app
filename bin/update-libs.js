const package = require("../package.json");
const { exec } = require('child_process');

const deps = Object.keys(package.dependencies).join(" ");
const ddeps = Object.keys(package.devDependencies).join(" ");

execute(`npm remove ${deps}`)
    .then(() => {
        console.log("Deleted deps.");
        return execute(`npm remove ${ddeps}`);
    })
    .then(() => {
        console.log("Deleted ddeps.");
        return execute(`npm install -D ${ddeps}`);
    })
    .then(() => {
        console.log("Re-Installed ddeps.");
        return execute(`npm install ${deps}`);
    })
    .then(() => {
        console.log("Re-Installed deps.");
    });

async function execute(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout) => {
            if (error) reject(error);
            resolve(stdout.trim());
        });
    });
}