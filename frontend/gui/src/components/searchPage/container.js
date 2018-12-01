import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import * as searchAction from "../../actions/search";
import News from "./News";

class Container extends Component {
  componentDidMount() {
    this.props.fetchTopNews();
  }

  render() {
    let { query, news } = this.props;

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
        <Grid item xs={6}>
          {query}
        </Grid>
        <Grid item xs={6}>
          <News latestNews={news} />
        </Grid>
      </Grid>
    );
  }
}

Container.propTypes = {
  query: PropTypes.string.isRequired,
  news: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    query: state.search.query,
    news: state.search.news
  };
}

export default connect(
  mapStateToProps,
  searchAction
)(Container);
