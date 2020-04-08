import React, { FC } from "react";
import styled, { css, ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "View/Home/Home";

import { GlobalStyle, theme } from "Util/resets.style";

const App: FC = (): JSX.Element => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </ThemeProvider>
  </>
);

export default App;
