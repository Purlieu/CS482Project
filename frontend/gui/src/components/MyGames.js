import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";

class MyGames extends Component {
  render() {
    return <div>My Games!</div>;
  }
}

export default compose(connect(null))(MyGames);
