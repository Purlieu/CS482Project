import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/auth";

class SignOut extends Component {
  componentWillMount() {
    this.props.signOut();
    this.props.history.push("/");
  }
  render() {
    return <div />;
  }
}

export default connect(
  null,
  actions
)(SignOut);
