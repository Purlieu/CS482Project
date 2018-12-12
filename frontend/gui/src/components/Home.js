import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import News from "./news";
import MyGames from "./myGames/index";
import requireAuth from "./requireAuth";
import * as searchAction from "../actions/search";
import { Typography } from "@material-ui/core";
import Loader from "./shared/Loader";

class Home extends Component {
  componentDidMount() {
    this.props.fetchTopNews();
    this.props.getGamesFromAPI(this.props.user);
  }
  render() {
    let { news, isLoading, saved_games } = this.props;

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
              <Grid item xs={12}>
                <Typography component='h2' variant='h5' gutterBottom>
                  Latest News
              </Typography>
                <News latestNews={news} />
              </Grid>
              <Grid item xs={4}>
                <Typography component='h2' variant='h5' gutterBottom>
                  My Saved Games
              </Typography>
                <MyGames listOfGames={saved_games} />
              </Grid>
            </Grid>
          )}
      </Grid>
    );
  }
}

Home.propTypes = {
  news: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    news: state.search.news,
    isLoading: state.shared.loading,
    saved_games: state.search.saved_games
  };
}

export default compose(
  requireAuth,
  connect(
    mapStateToProps,
    searchAction,
  )
)(Home);
