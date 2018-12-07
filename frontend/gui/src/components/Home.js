import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import News from "./news";
import requireAuth from "./requireAuth";

import * as searchAction from "../actions/search";
import { Typography } from "@material-ui/core";
import Loader from "./shared/Loader";

class Home extends Component {
  componentDidMount() {
    this.props.fetchTopNews();
  }

  render() {
    let { news, isLoading } = this.props;

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
            <Grid item xs={12}>
              <Typography component='h2' variant='h5' gutterBottom>
                My Saved Games
              </Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
    );
  }
}

Home.propTypes = {
  news: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    news: state.search.news,
    isLoading: state.shared.loading
  };
}

export default compose(
  requireAuth,
  connect(
    mapStateToProps,
    searchAction
  )
)(Home);
