import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import * as searchAction from "../../actions/search";
import Games from "../gamedetails/index.js";
import RecentSearches from "../RecentSearches";
import requireAuth from "../requireAuth";
import Loader from "../shared/Loader";

class Container extends Component {
  componentDidMount() {
    this.props.fetchTopNews();
  }

  render() {
    let { games, isLoading, pastSearches } = this.props;
    return (
      <Grid
        container
        spacing={8}
        direction='row'
        justify='center'
        alignItems='center'
      >
        {isLoading ? (
          <Loader />
        ) : (
          <Grid
            container
            spacing={8}
            direction='row'
            justify='flex-start'
            alignItems='flex-start'
          >
            <Grid item xs={12} sm={4}>
              <RecentSearches listOfSearches={pastSearches} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Games listOfGames={games} />
            </Grid>
          </Grid>
        )}
      </Grid>
    );
  }
}

Container.propTypes = {
  games: PropTypes.array.isRequired,
  pastSearches: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    games: state.search.games,
    pastSearches: state.search.pastSearches,
    isLoading: state.shared.loading
  };
}

export default compose(
  requireAuth,
  connect(
    mapStateToProps,
    searchAction
  )
)(Container);
