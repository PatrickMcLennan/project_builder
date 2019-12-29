const chalk = require("chalk");
const figlet = require("figlet");
const path = require("path");
const fs = require("fs");
const Radio = require("prompt-radio");
const { prompt } = require("enquirer");

const PATH: string = process.cwd();

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

const getName = prompt({
  type: "input",
  name: "name",
  message: "Projects Name?"
});

/* * * * * * * * *
 * - FUNCTIONS - *
 * * * * * * * * */
const newConfig: Function = (key: keyof IConfig): IConfig => {
  return { ...config, [key]: !config[key] };
};

const askQuestion: Function = (question: IRadio): string => {
  const answer = question.ask((answer: string) => answer);
  config = newConfig(answer);
  return answer;
};

const copyFile: Function = (blueprintPath: string, projectsName: string) =>
  fs.copyFile(blueprintPath, projectsName, (err: Error) => {
    if (err) {
      throw new Error(
        `There was an issue copy the blueprint for ${projectsName}`
      );
    } else {
      return true;
    }
  });

const makeDir: Function = (projectsName: string): boolean =>
  fs.mkdir(`${PATH}/${projectsName}`, (err: Error) => {
    if (err) {
      throw new Error(
        `There was an issue creating the ${projectsName} Directory`
      );
    } else {
      return true;
    }
  });

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
                config = newConfig(
                  prompt({
                    type: "input",
                    name: "name",
                    message: "Projects Name?"
                  })
                );
              });
            });
          } else if (config["Vanilla F/E"]) {
            config = newConfig(
              prompt({
                type: "input",
                name: "name",
                message: "Projects Name?"
              })
            );
          }
        }
      });
    } else if (answer === "Python") {
      getName
        .then(async (name: string) => {
          name = name.trim();
          await makeDir(name);
          //   process.chdir(name);
          await copyFile(
            "/Users/patrickmclennan/Documents/project_builder/blueprints/blueprint_python.py",
            name
          );
        })
        .catch((err: Error) => {
          throw new Error();
        });
    }
  });
});
