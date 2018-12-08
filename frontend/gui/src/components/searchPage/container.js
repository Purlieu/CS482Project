import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import * as searchAction from "../../actions/search";
import Games from "../gamedetails/index.js"
import requireAuth from "../requireAuth";

class Container extends Component {
  componentDidMount() {
    this.props.fetchTopNews();
  }



  render() {
    let { games } = this.props
    return (
      <Grid
        container
        spacing={8}
        direction='row'
        justify='flex-start'
        alignItems='flex-start'
      >
        <Grid item xs={6}>
          recent searches..
        </Grid>
        <Grid item xs={4} >
          <Games listOfGames={games} />
        </Grid>
      </Grid>
    );
  }
}

Container.propTypes = {
  query: PropTypes.string.isRequired,
  games: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    query: state.search.query,
    games: state.search.games
  };
}

export default compose(
  requireAuth,
  connect(
    mapStateToProps,
    searchAction
  )
)(Container);
