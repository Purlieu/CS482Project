import React, { Component } from "react";
import PropTypes from "prop-types";

import MyGamesDetails from "./MyGamesDetails";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import Pagination from "material-ui-flat-pagination";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import requireAuth from "../requireAuth";
import * as searchAction from "../../actions/search";

class MyGames extends Component {
  state = { offset: 0, limit: 10 };

  handleClick = offset => {
    this.setState({ offset });
  };
  onHandleGameClick = index => {};
  renderGames = listOfGames => {
    if (!Array.isArray(listOfGames) || !listOfGames.length) {
      return;
    }
    let currentGames;

    if (this.state.offset === 0) {
      currentGames = listOfGames.slice(0, this.state.limit);
    } else {
      currentGames = listOfGames.slice(
        this.state.offset,
        this.state.offset + this.state.limit
      );
    }

    return currentGames.map((games, index) => {
      return (
        <Grid item xs={3}>
          <MyGamesDetails
            gameid={games.gameid}
            notes={games.notes}
            rating={games.rating}
            url={games.image}
            title={games.title}
          />
        </Grid>
      );
    });
  };

  render() {
    let { listOfGames } = this.props;
    return (
      <div>
        <List>
          <Grid container direction='row'>
            {this.renderGames(listOfGames)}
          </Grid>
        </List>
        <Grid container justify='center'>
          <Pagination
            limit={this.state.limit}
            offset={this.state.offset}
            total={listOfGames ? listOfGames.length : 0}
            currentPageColor='inherit'
          />
        </Grid>
      </div>
    );
  }
}

MyGames.propTypes = {
  listOfGames: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    saved_games: state.search.saved_games
  };
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    searchAction
  )
)(MyGames);
