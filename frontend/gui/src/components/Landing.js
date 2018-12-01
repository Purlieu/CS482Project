import React, { Component } from "react";
import { connect } from "react-redux";

class Landing extends Component {
  componentDidMount() {
    if (this.props.user !== null) {
      this.props.history.push("/home");
    }
  }

  render() {
    return <div>Welcome!</div>;
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

export default connect(mapStateToProps)(Landing);
