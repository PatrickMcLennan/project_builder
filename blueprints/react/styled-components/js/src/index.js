import React, { createElement } from "react";
import { render } from "react-dom";

import App from "./App";

const ROOT = document.querySelector("#root");

render(createElement(App), ROOT);
