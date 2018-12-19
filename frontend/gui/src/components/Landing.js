import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardMedia } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { compose } from "redux";

import earth from "../resources/CGAR.png"

const styles = {
  card: {
    margin: 0,
    overflow: 'hidden',
  },
  media: {
    display: "block",
    margin: "0 auto",
    width: '1860px',
    height: '800px',
  },
};

class Landing extends Component {
  componentDidMount() {
    if (this.props.user !== null) {
      this.props.history.push("/home");
    }
  }



  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={earth}
        >
        </CardMedia>
      </Card >
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(Landing);	