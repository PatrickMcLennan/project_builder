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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var chalk = require("chalk");
var figlet = require("figlet");
var path = require("path");
var fs = require("fs");
var Radio = require("prompt-radio");
var prompt = require("enquirer").prompt;
var PATH = process.cwd();
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
var getName = prompt({
    type: "input",
    name: "name",
    message: "Projects Name?"
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
var copyFile = function (blueprintPath, projectsName) {
    return fs.copyFile(blueprintPath, projectsName, function (err) {
        if (err) {
            throw new Error("There was an issue copy the blueprint for " + projectsName);
        }
        else {
            return true;
        }
    });
};
var makeDir = function (projectsName) {
    return fs.mkdir(PATH + "/" + projectsName, function (err) {
        if (err) {
            throw new Error("There was an issue creating the " + projectsName + " Directory");
        }
        else {
            return true;
        }
    });
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
        else if (answer === "Python") {
            getName
                .then(function (name) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            name = name.trim();
                            return [4 /*yield*/, makeDir(name)];
                        case 1:
                            _a.sent();
                            //   process.chdir(name);
                            return [4 /*yield*/, copyFile("/Users/patrickmclennan/Documents/project_builder/blueprints/blueprint_python.py", name)];
                        case 2:
                            //   process.chdir(name);
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); })
                .catch(function (err) {
                throw new Error();
            });
        }
    });
});
