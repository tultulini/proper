const fs = require("fs")
const path = require("path")

// DO NOT DELETE THIS FILE
// This file is used by build system to build a clean npm package with the compiled js files in the root of the package.
// It will not be included in the npm package.
console.log(`running setup-package. __dirname:${__dirname}`)
function incrementVersionMinor() {
    const packagePath = path.join(__dirname, "/../package.json")
    const source = fs.readFileSync(packagePath).toString('utf-8');
    const packageData = JSON.parse(source);
    const { version } = packageData
    console.log(`original version: ${version}`)

    const versionParts = version.split('.')
    const minor = versionParts[versionParts.length - 1]
    versionParts[versionParts.length - 1] = Number(minor) + 1
    packageData.version = versionParts.join('.')
    console.log(`new version: ${packageData.version}`)


    fs.writeFileSync(packagePath, Buffer.from(JSON.stringify(packageData, null, 2), "utf-8"));
}

incrementVersionMinor();