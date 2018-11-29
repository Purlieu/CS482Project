import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";
import reducers from "./reducers/index";

// props children - wraps any child components
// with the parent component
// in this case - parent - Providor
// child can be App component for example

export default ({ children, initalState = {} }) => {
  const store = createStore(
    reducers,
    initalState,
    composeWithDevTools(applyMiddleware(reduxThunk))
  );

  return <Provider store={store}>{children}</Provider>;
};
