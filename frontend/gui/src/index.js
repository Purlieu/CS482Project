import React from "react";
import ReactDOM from "react-dom";
import Root from "./Root";

import App from "./components/App";

// App will be passed as a child component to the Root component
ReactDOM.render(
  <Root>
    <App />
  </Root>,
  document.querySelector("#root")
);
