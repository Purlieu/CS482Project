import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import reducers from "./reducers/index";

// props children - wraps any child components
// with the parent component
// in this case - parent - Providor
// child can be App component for example

export default ({ children, initalState = {} }) => {
  const store = createStore(
    reducers,
    initalState,
    applyMiddleware(reduxPromise)
  );

  return <Provider store={store}>{children}</Provider>;
};
