import { ChildProcess, exec } from "child_process";
import chalk from "chalk";
import figlet from "figlet";
import path from "path";
import fs from "fs";

const Radio = require("prompt-radio");
const { prompt } = require("enquirer");
const cliProgress = require("cli-progress");

/* * * * * * * * * *
 * - INTERFACES -  *
 * * * * * * * * * */
interface IConfig {
  TypeScript: boolean;
  JavaScript: boolean;
  "Vanilla F/E": boolean;
  React: boolean;
  Pug: boolean;
  SCSS: boolean;
  "styled-components": boolean;
  Express: boolean;
  feTesting: boolean;
  Node: boolean;
  Python: boolean;
  Rust: boolean;
  name: string;
}

interface ILoaderBar {
  start: (stop: number, start: number, options: { speed: string }) => void;
  stop: () => void;
  increment: () => void;
}

interface IPrompt {
  type: string;
  name: string;
  message: string;
}

interface IRadio {
  name: string;
  message: string;
  choices: string[];
  ask: any;
}

/* * * * * * * *
 * - CHOICES - *
 * * * * * * * */
let config: IConfig = {
  TypeScript: false,
  JavaScript: false,
  "Vanilla F/E": false,
  React: false,
  Pug: false,
  SCSS: false,
  "styled-components": false,
  Express: false,
  Node: false,
  feTesting: false,
  Python: false,
  Rust: false,
  name: ""
};

const language: IRadio = new Radio({
  name: "language",
  message: "Which Language?",
  choices: ["JavaScript", "TypeScript", "Python", "Rust"]
});

const frontOrBackEnd: IRadio = new Radio({
  name: "frontEndOrBackEnd",
  message: "What Type of Project ?",
  choices: ["Vanilla F/E", "React", "Pug", "Node"]
});

const reactStyling: IRadio = new Radio({
  name: "reactStyling",
  message: "SCSS or styled-components?",
  choices: ["SCSS", "styled-components"]
});

const feTesting: IRadio = new Radio({
  name: "feTesting",
  message: "Jest + @testing-library/react ?",
  choices: ["Ya", "Nah"]
});

const express: IRadio = new Radio({
  name: "express",
  message: "Express?",
  choices: ["Ya", "Nah"]
});

const promptOptions: IPrompt = {
  type: "input",
  name: "name",
  message: "Projects Name?"
};

/* * * * * * * * *
 * - FUNCTIONS - *
 * * * * * * * * */

const copyFile: Function = (blueprintPath: string, projectsName: string): void =>
  fs.copyFile(blueprintPath, projectsName, (err: Error) => {
    if (err) throw new Error(`There was an issue copying the blueprint for ${projectsName}`);
    else true;
  });

const createLoaders: Function = (numberOfLoaders: number): ILoaderBar[] =>
  [...Array(numberOfLoaders).keys()].map(
    (_number: number): ILoaderBar => new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
  );

const errorReport: Function = (err: Error, message: string): Error => {
  throw new Error(`\n ${chalk.red(message)}
        \n
        Message: ${chalk.red(err)}
        \n
        ${chalk.red(err)}
    `);
};

const finishLoader: Function = (loader: ILoaderBar): void => {
  loader.increment();
  return loader.stop();
};

const insertName: Function = (textToReplace: string[], name: string): void =>
  fs.readdir(__dirname, (err: Error, files: string[]): void => {
    if (err) errorReport(`There was an error trying to insert ${name} into package.json and index.html`, err);
    files.forEach((file: string) =>
      fs.readFile(file, "utf8", (err: Error, text: string): void => {
        if (err) errorReport(`There was an error trying to insert ${name} into ${file}`, err);
        const lines: string[] = text.split(/\r?\n/);
        lines.forEach((line: string): void =>
          line.split(" ").forEach((word: string): string => (textToReplace.includes(word) ? name : word))
        );
      })
    );
  });

const makeDir: Function = (projectsName: string): void =>
  fs.mkdir(`${path.join(__dirname, projectsName)}`, (err: Error) => {
    if (err) errorReport(`There was an issue creating the ${projectsName} Directory.`, err);
    else return true;
  });

const spawnErrorListener: Function = (spawnProcess: ChildProcess): ChildProcess =>
  spawnProcess.on("error", (err: Error) => errorReport(err, `Error listener on a spawn kicking in.`));

/* * * * * * * * * * *
 * - CONSTRUCTION -  *
 * * * * * * * * * * */

const buildExpress: Function = (typescript: boolean): void =>
  prompt(promptOptions)
    .then(async (res: { name: string }) => {
      const name: string = res.name.trim();
      console.log(name, typescript);
    })
    .catch((err: Error): Error => errorReport(`There was an error creating your Express project`, err));

const buildNode: Function = (typescript: boolean): void =>
  prompt(promptOptions)
    .then(async (res: { name: string }) => {
      const name: string = res.name.trim();
      return console.log(name, typescript);
    })
    .catch((err: Error): Error => errorReport(`There was an error creating your Node project.`, err));

const buildPug: Function = (typescript: boolean): void =>
  prompt(promptOptions)
    .then(async (res: { name: string }) => {
      const name: string = res.name.trim();
      const [directoryLoader, filesLoader, npmLoader]: ILoaderBar[] = createLoaders(3);

      // Create Directory, cd
      directoryLoader.start(1, 0, { speed: "N/A" });
      await makeDir(name);
      finishLoader(directoryLoader);
      process.chdir(name);

      // Copy Blueprints into Dir
      filesLoader.start(1, 0, { speed: "N/A" });
      const filesExec: ChildProcess = exec(`cp -r ${__dirname}/../blueprints/pug/${typescript ? "ts" : "js"}/ ./`);
      spawnErrorListener(filesExec);
      filesExec.on("exit", (exitStatus: number): void | Error => {
        if (exitStatus === 0) {
          finishLoader(filesLoader);

          // Install npm packages, exit
          npmLoader.start(1, 0, { speed: "N/A" });
          const npmExec: ChildProcess = exec(`npm install`);
          spawnErrorListener(npmExec);
          npmExec.on("exit", (exitStatus: number): void | Error => {
            if (exitStatus === 0) {
              finishLoader(npmLoader);
              console.log(
                `${chalk.green(
                  name
                )} is ready for you.  \n  There is a README.md to explain the current set up.  \n ${chalk.blue(
                  "Happy Hacking!"
                )}`
              );
            } else errorReport(`There was an issue installing the npm packages for ${name}`);
          });
        } else errorReport(`There was an issue copying the blueprint files into ${name}`, exitStatus);
      });
    })
    .catch((err: Error): Error => errorReport(`There was an error creating your Pug Project`, err));

const buildPython: Function = (): Promise<void> =>
  prompt(promptOptions).then(async (res: { name: string }) => {
    const name: string = res.name.trim();
    const [directoryBar, copyBar, venvBar]: ILoaderBar[] = createLoaders(3);

    // Make the Directory
    directoryBar.start(1, 0, { speed: "N/A" });
    await makeDir(name);
    finishLoader(directoryBar);
    process.chdir(`./${name}`);

    // Copy the blueprint
    copyBar.start(1, 0, { speed: "N/A" });
    await copyFile(path.resolve(__dirname, "../blueprints/blueprint_python.py"), `./${name}.py`);
    finishLoader(copyBar);

    // Install the Venv + exit
    venvBar.start(1, 0, { speed: "N/A" });
    const pythonSpawn: ChildProcess = exec("python3 -m venv ./");
    spawnErrorListener(pythonSpawn);
    pythonSpawn.on("close", (exitStatus: number): void | Error => {
      if (exitStatus === 0) {
        finishLoader(venvBar);
        return console.log(
          `
            ${chalk.green(`\n
            Thanks for using project_builder.  ${name} looks ready to go. \n
            A venv has been made - ${chalk.blue(`source bin/activate`)} within ${name} will fire it up for you. \n`)}
            Have at 'er. \n`
        );
      } else errorReport(exitStatus, `There was an error creating a venv for ${name} - project_builder has aborted.`);
    });
  });

const buildReact: Function = (
  typescript: boolean,
  styledComponents: boolean,
  feTesting: boolean
): Promise<void | Error> =>
  prompt(promptOptions)
    .then(async (res: { name: string }) => {
      const name: string = res.name.trim();
      const [directoryLoader, filesLoader, npmLoader]: ILoaderBar[] = createLoaders(3);

      directoryLoader.start(1, 0, { speed: "N/A" });
      await makeDir(name);
      finishLoader(directoryLoader);
      process.chdir(name);
    })
    .catch((err: Error): Error => errorReport(err, `There was an error trying to build your React project.`));

const buildRust: Function = (): Promise<void | Error> =>
  prompt(promptOptions)
    .then(async (res: { name: string }) => {
      const name: string = res.name.trim();
      const cargoLoader: ILoaderBar = createLoaders(1)[0];

      // Fire up Cargo
      cargoLoader.start(1, 0, { speed: "N/A" });
      const cargoSpawn: ChildProcess = exec(`cargo new ${name}`);
      spawnErrorListener(cargoSpawn);
      cargoSpawn.on("exit", (exitStatus: number): void | Error => {
        if (exitStatus === 0) {
          finishLoader(cargoLoader);
          console.log(`
                \n
                ${name} has been created with 'cargo new ${name}'
                \n
            `);
        } else errorReport(exitStatus, `There was an error running 'cargo new ${name}'`);
      });
    })
    .catch(
      (err: Error): Error =>
        errorReport(
          `There was an error creathing the Directory you've asked for - please make sure it is a valid name and try again.`,
          err
        )
    );

const buildVanilla: Function = (typescript: boolean): Promise<void | Error> =>
  prompt(promptOptions)
    .then(async (res: { name: string }) => {
      const name: string = res.name.trim();
      const [directoryLoader, filesLoader, npmLoader]: ILoaderBar[] = createLoaders(3);

      // Create Directory, cd
      directoryLoader.start(1, 0, { speed: "N/A" });
      await makeDir(name);
      finishLoader(directoryLoader);
      process.chdir(name);

      // Copy Blueprints into Dir
      filesLoader.start(1, 0, { speed: "N/A" });
      const filesExec: ChildProcess = exec(`cp -r ${__dirname}/../blueprints/vanilla/${typescript ? "ts" : "js"}/ ./`);
      spawnErrorListener(filesExec);
      filesExec.on("exit", (exitStatus: number): void | Error => {
        if (exitStatus === 0) {
          finishLoader(filesLoader);

          // Install packages, exit
          npmLoader.start(1, 0, { speed: "N/A" });
          const npmExec: ChildProcess = exec(`npm install`);
          spawnErrorListener(npmExec);
          npmExec.on("exit", (exitStatus: number): void | Error => {
            if (exitStatus === 0) {
              finishLoader(npmLoader);
              console.log(
                `${chalk.green(
                  name
                )} is ready for you.  \n  There is a README.md to explain the current set up.  \n ${chalk.blue(
                  "Happy Hacking!"
                )}`
              );
            } else errorReport(exitStatus, `There was an error trying to install all of the packages.`);
          });
        } else
          errorReport(`There was an error initializing npm on ${name} - aborted.  Is it an allowable name on npm?`);
      });
    })
    .catch((err: Error): Error => errorReport(`There was an error creating your Vanilla F/E build.`, err));

/* * * * * * * *
 * - RUNTIME - *
 * * * * * * * */

figlet("Project Builder", async (err: Error | null, result?: string | undefined) => {
  if (err) console.log(chalk.blue(result));
  console.log(`${chalk.blue(result)} \n`);

  language.ask((language: keyof IConfig) => {
    if (language === "Python") return buildPython();
    if (language === "Rust") return buildRust();

    if (language === "TypeScript" || language === "JavaScript") {
      const typescript: boolean = language === "TypeScript";
      frontOrBackEnd.ask((frontOrBackEnd: keyof IConfig) => {
        if (frontOrBackEnd === "Node") {
          express.ask((answer: string) => {
            return answer === "Ya" ? buildExpress(typescript) : buildNode(typescript);
          });
        }
        if (frontOrBackEnd === "Vanilla F/E") return buildVanilla(typescript);
        if (frontOrBackEnd === "Pug") return buildPug(typescript);
        if (frontOrBackEnd === "React") {
          reactStyling.ask((reactStyling: keyof IConfig) => {
            const styledComponents: boolean = reactStyling === "styled-components";
            feTesting.ask((feTestingAsk: string) => {
              const feTesting: boolean = feTestingAsk === "Ya";
              return buildReact(typescript, styledComponents, feTesting);
            });
          });
        }
      });
    }
  });
});
