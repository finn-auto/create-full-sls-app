#!/usr/bin/env node

import * as inquirer from "inquirer";
import * as fs from "fs";
import * as path from "path";
// import * as shell from "shelljs";
import * as template from "./utils/template";
import * as yargs from "yargs";
const chalk = require("chalk");

const CHOICES = fs.readdirSync(path.join(__dirname, "templates"));
const GIT_CHOISES = ["GitLab", "GitHub"];

const QUESTIONS = [
  {
    name: "template",
    type: "list",
    message: "What project template would you like to generate?",
    choices: CHOICES,
    when: () => !yargs.argv["template"],
  },
  {
    name: "name",
    type: "input",
    message: "Project name:",
    when: () => !yargs.argv["name"],
    validate: (input: string) => {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else
        return "Project name may only include letters, numbers, underscores and hashes.";
    },
  },
  {
    name: "organization",
    type: "input",
    message: "Organization name:",
    when: () => !yargs.argv["organization"],
    validate: (input: string) => {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else
        return "Organization name may only include letters, numbers, underscores and hashes.";
    },
  },
  {
    name: "gitSetup",
    type: "list",
    message: "Choose your Git setup:",
    choices: GIT_CHOISES,
    when: () => !yargs.argv["gitSetup"],
  },
  {
    name: "mainBranch",
    type: "list",
    message: "What's your main branch?:",
    choices: ["main", "master"],
    default: "main",
    when: () => !yargs.argv["mainBranch"],
  },
  {
    name: "enableSonarCloud",
    type: "confirm",
    message: "Would you like to EnableSonarCloud?:",
    when: (answers: any) =>
      answers["gitSetup"] === "GitLab" && !yargs.argv["enableSonarCloud"],
  },
  {
    name: "enableMultiRegion",
    type: "confirm",
    message:
      "Would you like to enable multi-region on domains? (add us-east-1):",
    when: () => !yargs.argv["enableMultiRegion"],
  },
  {
    name: "enableDataDog",
    type: "confirm",
    message: "Would you like to enable DataDog?:",
    when: () => !yargs.argv["enableDataDog"],
  },
  {
    name: "dataDogArnEuCentral",
    type: "input",
    default: "empty",
    message: "Enter DataDog ARN for Europe:",
    when: (answers: any) =>
      answers["enableDataDog"] && !yargs.argv["dataDogArnEuCentral"],
  },
  {
    name: "dataDogArnUsEast",
    type: "input",
    default: "empty",
    message: "Enter DataDog ARN for USA:",
    when: (answers: any) =>
      answers["enableDataDog"] &&
      answers["enableMultiRegion"] &&
      !yargs.argv["dataDogArnUsEast"],
  },
  {
    name: "memorySize",
    type: "number",
    message: "Enter Memory Size value:",
    default: 256,
    when: () => !yargs.argv["memorySize"],
  },
  {
    name: "timeout",
    type: "number",
    message: "Enter Timeout value:",
    default: 10,
    when: () => !yargs.argv["timeout"],
  },
  {
    name: "minimumCompressionSize",
    type: "number",
    message: "Enter minimumCompressionSize value:",
    default: 1024,
    when: () => !yargs.argv["minimumCompressionSize"],
  },
  {
    name: "maxRequestsPerSecond",
    type: "number",
    message: "Enter API Gateway Throttling maxRequestsPerSecond:",
    default: 100,
    when: () => !yargs.argv["maxRequestsPerSecond"],
  },
  {
    name: "maxConcurrentRequests",
    type: "number",
    message: "Enter API Gateway Throttling maxConcurrentRequests:",
    default: 50,
    when: () => !yargs.argv["maxConcurrentRequests"],
  },
  {
    name: "developmentUrl",
    type: "input",
    default: "dev-service.domain.com",
    message: "What's your development url?:",
    when: () => !yargs.argv["developmentUrl"],
  },
  {
    name: "productionUrl",
    type: "input",
    default: "service.domain.com",
    message: "What's your production url?:",
    when: () => !yargs.argv["productionUrl"],
  },
];

const CURR_DIR = process.cwd();

export interface TemplateConfig {
  files?: string[];
  postMessage?: string;
}

export interface CliOptions {
  projectName: string;
  templateName: string;
  templatePath: string;
  tartgetPath: string;
  config: TemplateConfig;
}

export interface TemplateData {
  projectPath: string;
  projectName: string;
  organization: string;
  mainBranch: string;
  enableSonarCloud: boolean;
  developmentUrl: string;
  productionUrl: string;
  enableMultiRegion: boolean;
  enableDataDog: boolean;
  dataDogArnEuCentral: string;
  dataDogArnUsEast: string;
  memorySize: number;
  timeout: number;
  minimumCompressionSize: number;
  maxRequestsPerSecond: number;
  maxConcurrentRequests: number;
  gitSetup: "GitLab" | "GitHub";
}

inquirer.prompt(QUESTIONS).then((answers: any) => {
  answers = Object.assign({}, answers, yargs.argv);

  const projectChoice = answers["template"];
  const projectName = answers["name"];
  const organization = answers["organization"];
  const mainBranch = answers["mainBranch"];
  const enableSonarCloud = answers["enableSonarCloud"];
  const developmentUrl = answers["developmentUrl"];
  const productionUrl = answers["productionUrl"];
  const enableMultiRegion = answers["enableMultiRegion"];
  const enableDataDog = answers["enableDataDog"];
  const dataDogArnEuCentral = answers["dataDogArnEuCentral"];
  const dataDogArnUsEast = answers["dataDogArnUsEast"];
  const memorySize = answers["memorySize"];
  const timeout = answers["timeout"];
  const minimumCompressionSize = answers["minimumCompressionSize"];
  const maxRequestsPerSecond = answers["maxRequestsPerSecond"];
  const maxConcurrentRequests = answers["maxConcurrentRequests"];
  const gitSetup = answers["gitSetup"];

  const templatePath = path.join(__dirname, "templates", projectChoice);
  const tartgetPath = path.join(CURR_DIR, projectName);
  const templateConfig = getTemplateConfig(templatePath);

  const options: CliOptions = {
    projectName,
    templateName: projectChoice,
    templatePath,
    tartgetPath,
    config: templateConfig,
  };

  if (!createProject(tartgetPath)) {
    return;
  }

  const templateData: TemplateData = {
    projectName,
    mainBranch,
    enableMultiRegion,
    enableSonarCloud,
    developmentUrl,
    productionUrl,
    enableDataDog,
    dataDogArnEuCentral,
    dataDogArnUsEast,
    memorySize,
    timeout,
    minimumCompressionSize,
    maxRequestsPerSecond,
    maxConcurrentRequests,
    organization,
    projectPath: path.join(CURR_DIR, projectName),
    gitSetup,
  };
  createDirectoryContents(templatePath, templateData, templateConfig);
  // Create .env file
  try {
    const readEnvFrom = path.join(
      CURR_DIR,
      templateData.projectName,
      "example.env"
    );
    let envContents = fs.readFileSync(readEnvFrom, "utf8");
    envContents = template.render(envContents, templateData);
    const writeEnvTo = path.join(CURR_DIR, templateData.projectName, ".env");
    fs.writeFileSync(writeEnvTo, envContents, "utf8");
  } catch (e) {}

  // Disable postProcess
  // if (!postProcess(options)) {
  //   return;
  // }

  showMessage(options);
});

function showMessage(options: CliOptions) {
  console.log("");
  console.log(chalk.green("Done."));
  console.log(chalk.green(`Go into the project: cd ${options.projectName}`));

  const message = options.config.postMessage;

  if (message) {
    console.log("");
    console.log(chalk.yellow(message));
    console.log("");
  }
}

function getTemplateConfig(templatePath: string): TemplateConfig {
  const configPath = path.join(templatePath, ".template.json");

  if (!fs.existsSync(configPath)) return {};

  const templateConfigContent = fs.readFileSync(configPath);

  if (templateConfigContent) {
    return JSON.parse(templateConfigContent.toString());
  }

  return {};
}

function createProject(projectPath: string) {
  if (fs.existsSync(projectPath)) {
    console.log(
      chalk.red(`Folder ${projectPath} exists. Delete or use another name.`)
    );
    return false;
  }

  fs.mkdirSync(projectPath);
  return true;
}

// function postProcess(options: CliOptions) {
//   if (isNode(options)) {
//     return postProcessNode(options);
//   }
//   return true;
// }

// function isNode(options: CliOptions) {
//   return fs.existsSync(path.join(options.templatePath, "package.json"));
// }

// function postProcessNode(options: CliOptions) {
//   shell.cd(options.tartgetPath);

//   let cmd = "";

//   if (shell.which("yarn")) {
//     cmd = "yarn";
//   } else if (shell.which("npm")) {
//     cmd = "npm install";
//   }

//   if (cmd) {
//     const result = shell.exec(cmd);

//     if (result.code !== 0) {
//       return false;
//     }
//   } else {
//     console.log(chalk.red("No yarn or npm found. Cannot run installation."));
//   }

//   return true;
// }

const SKIP_FILES = ["node_modules", ".template.json"];

function createDirectoryContents(
  templatePath: string,
  templateData: TemplateData,
  config: TemplateConfig,
  parentFolderName: string = "."
) {
  const currentFolder = path.join(templatePath, parentFolderName);
  const filesToCreate = fs.readdirSync(currentFolder);

  filesToCreate.forEach((file) => {
    const shouldIgnoreSonarSetup =
      !templateData.enableSonarCloud &&
      file.includes("sonar-project.properties");
    const shouldIgnoreGithubSetup =
      templateData.gitSetup === "GitLab" &&
      (file.includes("linting-and-building.yml") ||
        file.includes("unit-tests.yml") ||
        file.includes(".github") ||
        file.includes("workflows"));
    const shouldIgnoreGitlabSetup =
      templateData.gitSetup === "GitHub" && file.includes(".gitlab-ci.yml");

    if (
      shouldIgnoreSonarSetup ||
      shouldIgnoreGithubSetup ||
      shouldIgnoreGitlabSetup
    ) {
      return;
    }

    const origFilePath = path.join(templatePath, parentFolderName, file);

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (SKIP_FILES.indexOf(file) > -1) return;

    if (stats.isFile()) {
      let contents = fs.readFileSync(origFilePath, "utf8");

      contents = template.render(contents, templateData);

      const writePath = path.join(
        CURR_DIR,
        templateData.projectName,
        parentFolderName,
        file
      );
      fs.writeFileSync(writePath, contents, "utf8");
    } else if (stats.isDirectory()) {
      const folderPath = path.join(
        CURR_DIR,
        templateData.projectName,
        parentFolderName,
        file
      );

      fs.mkdirSync(folderPath);
      // recursive call
      const parentPath = path.join(parentFolderName, file);
      createDirectoryContents(templatePath, templateData, config, parentPath);
    }
  });
}
