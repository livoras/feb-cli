#! /usr/bin/env node

var program = require("commander")
var config = require("./package")
var fs = require("fs-extra")
var BOILTERPLATER_DIR = __dirname + "/node_modules/feb"
var chalk = require("chalk")

program
  .version(config.version)
  .usage("new <project-name>")

program
  .command("new <project>")
  .description("Create a new front-end project.")
  .option("-f, --force", "Force to create project.")
  .action(function(project, options) {
    var DIR_NAME = process.cwd() + "/" + project
    if (!options.force && !isEmpty(DIR_NAME)) {
      var WORNING = chalk.red(
        "\nDirectory " + chalk.blue(project) + " is not empty, use:\n\n" +
        chalk.green("    $ ") +
        chalk.cyan("feb new -f " + project + "\n\n") + 
        "to forcely create.")
      return console.error(WORNING)
    }
    createAndCopy(DIR_NAME, project)
  })

function createAndCopy(DIR_NAME, projectName) {
  fs.copy(BOILTERPLATER_DIR, DIR_NAME, function(err) {
    if (err) throw new Error(err)
    var cd = 
    console.log(
      "Done! Run: \n\n" + 
      chalk.green("    $ ") +
      chalk.cyan("cd " + projectName + chalk.black(" && ") + "npm install\n\n") +
      "to initialize your project."
    )
  })
}

function isEmpty(directory) {
  if (!fs.existsSync(directory)) return true
  var folders = fs.readdirSync(directory)
  if (folders.length) return false;
  return true;
}

program.parse(process.argv)
