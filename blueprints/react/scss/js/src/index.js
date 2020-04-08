import React, { createElement } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "./main.scss";

const ROOT = document.querySelector("#root");

ReactDOM.render(createElement(App), ROOT);
