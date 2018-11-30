import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

class Container extends Component {
  render() {
    return (
      <Grid
        container
        spacing={8}
        direction='row'
        justify='flex-start'
        alignItems='flex-start'
      >
        <Grid item xs={12}>
          {this.props.query}
        </Grid>
      </Grid>
    );
  }
}

Container.propTypes = {
  query: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    query: state.search.query
  };
}

export default connect(mapStateToProps)(Container);
