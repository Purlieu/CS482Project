import React, { Component } from "react";
import NavBar from "./navBar/NavBar";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as authActions from "../actions/auth";

class App extends Component {
  componentDidMount() {
    this.props.checkAuthState();
  }

  render() {
    return (
      <div>
        <NavBar>{this.props.children}</NavBar>
      </div>
    );
  }
}

export default compose(
  withRouter,
  connect(
    null,
    authActions
  )
)(App);
