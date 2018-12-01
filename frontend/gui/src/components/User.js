import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import requireAuth from "./requireAuth";

class User extends Component {
  render() {
    return <div>Start Editing</div>;
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

export default compose(
  requireAuth,
  connect(mapStateToProps)
)(User);
