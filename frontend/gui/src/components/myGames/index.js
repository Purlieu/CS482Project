import React, { Component } from "react";
import PropTypes from "prop-types";

import MyGamesDetails from "./MyGamesDetails";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import Pagination from "material-ui-flat-pagination";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as searchAction from "../../actions/search";
import api from "../../api/index";

class MyGames extends Component {
  state = { offset: 0, limit: 4 };

  handleClick = offset => {
    this.setState({ offset });
  };
  onHandleGameDelete = id => {
    api.deleteGame(this.props.user, id).then(() => {
      this.props.getGamesFromAPI(this.props.user);
    });
  };
  onHandleGameClick = index => {
    let currentGame = {
      id: this.props.listOfGames[index].gameid,
      release_dates: [
        {
          human: this.props.listOfGames[index].release_date
        }
      ],
      name: this.props.listOfGames[index].title
    };

    this.props.setCurrentGame(currentGame, () => {
      this.props.history.push("/detail");
    });
  };
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
        <Grid item xs={12} sm={3} key={games.gameid + index + games.rating}>
          <MyGamesDetails
            id={games.id}
            gameid={games.gameid}
            notes={games.notes}
            rating={games.rating}
            url={games.image}
            title={games.title}
            index={index}
            onGameClick={this.onHandleGameClick}
            onDelete={this.onHandleGameDelete}
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
            total={listOfGames.length ? listOfGames.length : 0}
            onClick={(e, offset) => this.handleClick(offset)}
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
    listOfGames: state.search.saved_games,
    user: state.auth.user
  };
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    searchAction
  )
)(MyGames);
