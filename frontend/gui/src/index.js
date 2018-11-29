import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Root from "./Root";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";

import App from "./components/App";
import Router from "./Router";

const theme = createMuiTheme({
  palette: {
    primary: blue
  },
  typography: {
    useNextVariants: true
  }
});

// App will be passed as a child component to the Root component

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Root>
      <BrowserRouter>
        <App>
          <Router />
        </App>
      </BrowserRouter>
    </Root>
  </MuiThemeProvider>,
  document.querySelector("#root")
);
