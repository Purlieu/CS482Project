import React, { Component } from "react";
import PropTypes from "prop-types";

import GameDetails from "./GameDetails";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import Pagination from "material-ui-flat-pagination";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import requireAuth from "../requireAuth";
import * as searchAction from "../../actions/search";

class Games extends Component {
  state = { offset: 0, limit: 10 };

  handleClick = offset => {
    this.setState({ offset });
  };
  onHandleGameClick = index => {
    this.props.setCurrentGame(this.props.games[index], () => {
      this.props.history.push("/detail");
    });
  };
  renderGames = listOfGames => {
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
        <GameDetails
          name={games.name}
          release_date={
            games.release_dates ? games.release_dates[0].human : "None Listed"
          }
          summary={games.summary}
          url={games.url}
          key={games.id}
          image={
            games.cover
              ? games.cover.url
              : "https://sc.sftcdn.net/images/f1936-d9195.png"
          }
          index={index}
          onGameClick={this.onHandleGameClick}
        />
      );
    });
  };

  render() {
    let { listOfGames } = this.props;
    return (
      <div>
        <List>{this.renderGames(listOfGames)}</List>
        <Grid container justify='center'>
          <Pagination
            limit={this.state.limit}
            offset={this.state.offset}
            total={listOfGames.length}
            onClick={(e, offset) => this.handleClick(offset)}
            currentPageColor='inherit'
          />
        </Grid>
      </div>
    );
  }
}

Games.propTypes = {
  listOfGames: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    games: state.search.games
  };
}

export default compose(
  requireAuth,
  withRouter,
  connect(
    mapStateToProps,
    searchAction
  )
)(Games);
