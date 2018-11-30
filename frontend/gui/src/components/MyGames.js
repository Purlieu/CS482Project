import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import requireAuth from "./requireAuth";

class MyGames extends Component {
  render() {
    return <div>My Games!</div>;
  }
}

export default compose(
  requireAuth,
  connect(null)
)(MyGames);
