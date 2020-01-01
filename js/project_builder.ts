import { ChildProcess, exec, spawn } from "child_process";
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
  "Vanilla Node": boolean;
  Express: boolean;
  feTesting: boolean;
  python: boolean;
  rust: boolean;
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
  "Vanilla Node": false,
  Express: false,
  feTesting: false,
  python: false,
  rust: false,
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

const projectName: Promise<IPrompt> = prompt({
  type: "input",
  name: "name",
  message: "Projects Name?"
});

/* * * * * * * * *
 * - FUNCTIONS - *
 * * * * * * * * */

const copyFile: Function = (
  blueprintPath: string,
  projectsName: string
): void =>
  fs.copyFile(blueprintPath, projectsName, (err: Error) => {
    if (err) {
      throw new Error(
        `
        There was an issue copying the blueprint for ${projectsName}
        `
      );
    } else {
      return true;
    }
  });

const createLoaders: Function = (numberOfLoaders: number): ILoaderBar[] =>
  [...Array(numberOfLoaders).keys()].map(
    (_number: number): ILoaderBar =>
      new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
  );

const errorReport: Function = (err: Error, message: string): Error => {
  throw new Error(`
        \n
        ${chalk.red(message)}
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

const makeDir: Function = (projectsName: string): void =>
  fs.mkdir(`${path.join(__dirname, projectsName)}`, (err: Error) => {
    if (err) {
      errorReport(
        `There was an issue creating the ${projectsName} Directory.`,
        err
      );
    } else {
      return true;
    }
  });

const newConfig: Function = (key: keyof IConfig): IConfig => {
  return { ...config, [key]: !config[key] };
};

const spawnErrorListener: Function = (
  spawnProcess: ChildProcess
): ChildProcess =>
  spawnProcess.on("error", (err: Error) =>
    errorReport(err, `Error listener on a spawn kicking in.`)
  );

/* * * * * * * *
 * - RUNTIME - *
 * * * * * * * */
figlet("Project Builder", (err: Error | null, result?: string | undefined) => {
  if (err) {
    console.log(chalk.blue(result));
  }
  console.log(chalk.blue(result));
  console.log("\n");

  language.ask((answer: string) => {
    config = newConfig(answer);

    if (answer === "TypeScript" || answer === "JavaScript") {
      frontOrBackEnd.ask((answer: string) => {
        config = newConfig(answer);

        if (answer === "Node") {
          config = newConfig(answer);

          return express.ask((answer: string) => {
            config = newConfig(answer);
          });
        } else {
          if (config.React) {
            reactStyling.ask((answer: string) => {
              config = newConfig(answer);

              feTesting.ask((answer: string) => {
                config = newConfig(answer === "Ya" ? "feTesting" : "burner");
              });
            });
          } else if (config["Vanilla F/E"]) {
          }
        }
      });
    } else if (answer === "Python") {
      /* * * * * * * *
       * - PYTHON -  *
       * * * * * * * */
      const getName = () =>
        projectName.then(async (res: { name: string }) => {
          const name: string = res.name.trim();
          const [directoryBar, copyBar, venvBar]: ILoaderBar[] = createLoaders(
            3
          );
          directoryBar.start(1, 0, {
            speed: "N/A"
          });
          await makeDir(name);
          finishLoader(directoryBar);
          process.chdir(`./${name}`);

          copyBar.start(1, 0, {
            speed: "N/A"
          });
          await copyFile(
            path.resolve(__dirname, "../blueprints/blueprint_python.py"),
            `./${name}.py`
          );
          finishLoader(copyBar);
          venvBar.start(1, 0, {
            speed: "N/A"
          });

          const pythonSpawn: ChildProcess = exec("python3 -m venv ./");

          spawnErrorListener(pythonSpawn);

          pythonSpawn.on("close", (exitStatus: number): void | Error => {
            if (exitStatus === 0) {
              finishLoader(venvBar);
              return console.log(
                `
                    ${chalk.green(`\n
                    Thanks for using project_builder.  ${name} looks ready to go. \n
                    A venv has been made - ${chalk.blue(
                      `source bin/activate`
                    )} within ${name} will fire it up for you. \n`)}
                    Have at 'er. \n`
              );
            } else {
              errorReport(
                exitStatus,
                `There was an error creating a venv for ${name} - project_builder has aborted.`
              );
            }
          });
        });
      return getName();
    } else if (answer === "Rust") {
      /* * * * * * *
       * - RUST -  *
       * * * * * * */
      const getName: Function = () => {
        projectName
          .then(async (res: { name: string }) => {
            const name: string = res.name.trim();
            const cargoLoader: ILoaderBar = createLoaders(1)[0];

            cargoLoader.start(1, 0, {
              speed: "N/A"
            });
            const cargoSpawn: ChildProcess = exec(`cargo new ${name}`);

            spawnErrorListener(cargoSpawn);

            cargoSpawn.on("exit", (exitStatus: number) => {
              if (exitStatus === 0) {
                finishLoader(cargoLoader);
                console.log(`
                    \n
                    ${name} has been created with 'cargo new ${name}'
                    \n
                `);
              } else {
                errorReport(
                  exitStatus,
                  `There was an error running 'cargo new ${name}'`
                );
              }
            });
          })
          .catch(
            (err: Error): Error =>
              errorReport(
                `There was an error creathing the Directory you've asked for - please make sure it is a valid name and try again.`,
                err
              )
          );
      };
      return getName();
    }
  });
});
