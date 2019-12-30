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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var figlet_1 = __importDefault(require("figlet"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
// const fs = require("fs");
var Radio = require("prompt-radio");
var prompt = require("enquirer").prompt;
var spawn = require("child_process").spawn;
var cliProgress = require("cli-progress");
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
var projectName = prompt({
    type: "input",
    name: "name",
    message: "Projects Name?"
});
/* * * * * * * * *
 * - FUNCTIONS - *
 * * * * * * * * */
var copyFile = function (blueprintPath, projectsName) {
    return fs_1.default.copyFile(blueprintPath, projectsName, function (err) {
        if (err) {
            throw new Error("\n        There was an issue copying the blueprint for " + projectsName + "\n        ");
        }
        else {
            return true;
        }
    });
};
var createLoaders = function (numberOfLoaders) {
    return __spread(Array(numberOfLoaders).keys()).map(function (_number) {
        return new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    });
};
var errorReport = function (err, message) {
    throw new Error("\n        \n\n        " + chalk_1.default.red(message) + "\n        \n\n        Message: " + chalk_1.default.red(err) + "\n        \n\n        " + chalk_1.default.red(err) + "\n    ");
};
var finishLoader = function (loader) {
    loader.increment();
    return loader.stop();
};
var makeDir = function (projectsName) {
    return fs_1.default.mkdir("" + path_1.default.join(__dirname, projectsName), function (err) {
        if (err) {
            errorReport("There was an issue creating the " + projectsName + " Directory.", err);
        }
        else {
            return true;
        }
    });
};
var newConfig = function (key) {
    var _a;
    return __assign(__assign({}, config), (_a = {}, _a[key] = !config[key], _a));
};
var spawnErrorListener = function (spawnProcess) {
    return spawnProcess.on("error", function (err) {
        return errorReport(err, "Error listener on a spawn kicking in.");
    });
};
/* * * * * * * *
 * - RUNTIME - *
 * * * * * * * */
figlet_1.default("Project Builder", function (err, project_builder) {
    if (err) {
        console.log(chalk_1.default.blue(project_builder));
    }
    console.log(chalk_1.default.blue(project_builder));
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
                            });
                        });
                    }
                    else if (config["Vanilla F/E"]) {
                    }
                }
            });
        }
        else if (answer === "Python") {
            /* * * * * * * *
             * - PYTHON -  *
             * * * * * * * */
            var getName = function () {
                return projectName.then(function (res) { return __awaiter(void 0, void 0, void 0, function () {
                    var name, _a, directoryBar, copyBar, venvBar, pythonSpawn, venvSpawn;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                name = res.name.trim();
                                _a = __read(createLoaders(3), 3), directoryBar = _a[0], copyBar = _a[1], venvBar = _a[2];
                                directoryBar.start(1, 0, {
                                    speed: "N/A"
                                });
                                return [4 /*yield*/, makeDir(name)];
                            case 1:
                                _b.sent();
                                finishLoader(directoryBar);
                                process.chdir("./" + name);
                                copyBar.start(1, 0, {
                                    speed: "N/A"
                                });
                                return [4 /*yield*/, copyFile(path_1.default.resolve(__dirname, "../blueprints/blueprint_python.py"), "./" + name + ".py")];
                            case 2:
                                _b.sent();
                                finishLoader(copyBar);
                                venvBar.start(2, 0, {
                                    speed: "N/A"
                                });
                                pythonSpawn = spawn("python3", [
                                    "-m",
                                    "venv",
                                    "./"
                                ]);
                                spawnErrorListener(pythonSpawn);
                                pythonSpawn.on("close", function (exitStatus) {
                                    if (exitStatus === 0) {
                                        venvBar.increment();
                                    }
                                    else {
                                        errorReport(exitStatus, "There was an error creating a venv for " + name + " - project_builder has aborted.");
                                    }
                                });
                                venvSpawn = spawn(["source", "bin/activate"]);
                                spawnErrorListener(venvSpawn);
                                venvSpawn.on("close", function (exitStatus) {
                                    console.log(venvSpawn);
                                    if (exitStatus === 0) {
                                        finishLoader(venvBar);
                                        return console.log("\n                    " + chalk_1.default.green("\n\n                    Thanks for using project_builder.  " + name + " looks ready to go. \n\n                    A venv has been made and activated. \n") + "\n                    " + chalk_1.default.blue("Have at 'er. \n"));
                                    }
                                    else {
                                        errorReport(exitStatus, "There was an error activating your new venv - everything else seems fine though.");
                                    }
                                });
                                return [2 /*return*/];
                        }
                    });
                }); });
            };
            return getName();
        }
        else if (answer === "Rust") {
            /* * * * * * *
             * - RUST -  *
             * * * * * * */
            var getName = function () {
                projectName
                    .then(function (res) { return __awaiter(void 0, void 0, void 0, function () {
                    var name, cargoLoader, cargoSpawn;
                    return __generator(this, function (_a) {
                        name = res.name.trim();
                        cargoLoader = createLoaders(1)[0];
                        cargoLoader.start(1, 0, {
                            speed: "N/A"
                        });
                        cargoSpawn = spawn("bash", [
                            "cargo",
                            "new",
                            "" + name
                        ]);
                        spawnErrorListener(cargoSpawn);
                        cargoSpawn.on("exit", function (exitStatus) {
                            if (exitStatus === 0) {
                                finishLoader(cargoLoader);
                                console.log("\n                    \n\n                    " + name + " has been created with 'cargo new " + name + "'\n                    \n\n                ");
                            }
                            else {
                                errorReport(exitStatus, "There was an error running 'cargo new " + name + "'");
                            }
                        });
                        return [2 /*return*/];
                    });
                }); })
                    .catch(function (err) {
                    return errorReport("There was an error creathing the Directory you've asked for - please make sure it is a valid name and try again.", err);
                });
            };
            return getName();
        }
    });
});
