"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var chalk = require("chalk");
var figlet = require("figlet");
var fs = require("fs");
var Radio = require("prompt-radio");
var prompt = require("enquirer").prompt;
/* * * * * * * *
 * - CHOICES - *
 * * * * * * * */
var config = {
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
var language = new Radio({
    name: "language",
    message: "Which Language?",
    choices: ["JavaScript", "TypeScript", "Python", "Rust"]
});
var frontOrBackEnd = new Radio({
    name: "frontEndOrBackEnd",
    message: "What Type of Project ?",
    choices: ["Vanilla F/E", "React", "Pug", "Node"]
});
var reactStyling = new Radio({
    name: "reactStyling",
    message: "SCSS or styled-components?",
    choices: ["SCSS", "styled-components"]
});
var feTesting = new Radio({
    name: "feTesting",
    message: "Jest + @testing-library/react ?",
    choices: ["Ya", "Nah"]
});
var express = new Radio({
    name: "express",
    message: "Express?",
    choices: ["Ya", "Nah"]
});
/* * * * * * * * *
 * - FUNCTIONS - *
 * * * * * * * * */
var newConfig = function (key) {
    var _a;
    return __assign(__assign({}, config), (_a = {}, _a[key] = !config[key], _a));
};
var askQuestion = function (question) {
    var answer = question.ask(function (answer) { return answer; });
    config = newConfig(answer);
    return answer;
};
figlet("Project Builder", function (err, project_builder) {
    if (err) {
        console.error("Weird - the logo isn't working.  The CLI should be fine though.");
    }
    console.log(chalk.blue(project_builder));
    console.log("\n");
    language.ask(function (answer) {
        config = newConfig(answer);
        if (answer === "TypeScript" || answer === "JavaScript") {
            frontOrBackEnd.ask(function (answer) {
                config = newConfig(answer);
                if (answer === "Node") {
                    config = newConfig(answer);
                    return express.ask(function (answer) {
                        config = newConfig(answer);
                    });
                }
                else {
                    if (config.React) {
                        reactStyling.ask(function (answer) {
                            config = newConfig(answer);
                            feTesting.ask(function (answer) {
                                config = newConfig(answer === "Ya" ? "feTesting" : "burner");
                                config = newConfig(prompt({
                                    type: "input",
                                    name: "name",
                                    message: "Projects Name?"
                                }));
                            });
                        });
                    }
                    else if (config["Vanilla F/E"]) {
                        config = newConfig(prompt({
                            type: "input",
                            name: "name",
                            message: "Projects Name?"
                        }));
                    }
                }
            });
        }
    });
});
