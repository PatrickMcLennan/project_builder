import { ChildProcess } from "child_process";

const chalk = require("chalk");
const figlet = require("figlet");
const path = require("path");
const fs = require("fs");
const Radio = require("prompt-radio");
const { prompt } = require("enquirer");
const { spawn } = require("child_process");
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
): boolean | Error =>
  fs.copyFile(blueprintPath, projectsName, (err: Error) => {
    if (err) {
      throw new Error(
        `There was an issue copy the blueprint for ${projectsName}`
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

const makeDir: Function = (projectsName: string): boolean | Error =>
  fs.mkdir(`${path.join(__dirname, projectsName)}`, (err: Error) => {
    if (err) {
      throw new Error(
        `There was an issue creating the ${projectsName} Directory`
      );
    } else {
      return true;
    }
  });

const newConfig: Function = (key: keyof IConfig): IConfig => {
  return { ...config, [key]: !config[key] };
};

/* * * * * * * *
 * - RUNTIME - *
 * * * * * * * */
figlet("Project Builder", (err: Error, project_builder: string) => {
  if (err) {
    console.error(
      "Weird - the logo isn't working.  The CLI should be fine though."
    );
  }
  console.log(chalk.blue(project_builder));
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
          directoryBar.increment();
          directoryBar.stop();

          copyBar.start(1, 0, {
            speed: "N/A"
          });
          process.chdir(`./${name}`);
          await copyFile(
            "/Users/patrickmclennan/Documents/project_builder/blueprints/blueprint_python.py",
            `./${name}.py`
          );
          copyBar.increment();
          copyBar.stop();
          venvBar.start(2, 0, {
            speed: "N/A"
          });
          const pythonSpawn: ChildProcess = spawn("python", [
            "-m",
            "venv",
            "./"
          ]);
          pythonSpawn.on("exit", (exitStatus: number) => {
            if (exitStatus === 0) {
              venvBar.increment();
            } else {
              throw new Error(
                `There was an error creating a venv for ${name} - project_builder has aborted.  It is recommend you try again.`
              );
            }
          });
          const venvActivation: ChildProcess = spawn("bash", [
            "source bin/activate"
          ]);
          venvActivation.on("exit", (exitStatus: number) => {
            if (exitStatus === 0) {
              venvBar.increment();
              venvBar.stop();

              return console.log(
                `
                    \n
                    Thanks for using project_builder.  ${name} looks ready to go
                    \n
                    A venv has been made and activated.
                    \n
                    Have at 'er.
                    \n`
              );
            } else {
              throw new Error(
                "There was an error activating your new venv - everything else seems fine though."
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
          })
          .catch((err: Error) => {
            throw new Error(
              "There was an error creathing the Directory you've asked for - please make sure it is a valid name and try again."
            );
          });
      };
    }
  });
});
