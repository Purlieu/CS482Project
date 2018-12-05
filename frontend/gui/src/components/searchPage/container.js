import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import * as searchAction from "../../actions/search";
import GameDetails from "../gamedetails/GameDetails"
import requireAuth from "../requireAuth";

class Container extends Component {
  componentDidMount() {
    this.props.fetchTopNews();
  }
  componentDidUpdate(prevProps) {
    console.log(prevProps)
    this.props.fetchGameQuery(prevProps.query);
  }

  render() {
    let { games } = this.props.games
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
        <Grid item xs={6} >
          <GameDetails listofGames={games}>

          </GameDetails>
        </Grid>
      </Grid >
    );
  }
}

Container.propTypes = {
  query: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
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
