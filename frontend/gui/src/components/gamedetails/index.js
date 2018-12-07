import React, { Component } from "react";
import PropTypes from "prop-types";

import GameDetails from "./GameDetails";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import Pagination from "material-ui-flat-pagination";

class Games extends Component {
  state = { offset: 0, limit: 5 };

  handleClick = offset => {
    this.setState({ offset });
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

    return currentGames.map(games => {
      return (
        <GameDetails
          name={games.name}
          summary={games.summary}
          url={games.url}
          key={games.id}
          image={games.cover ? games.cover.url : ""}
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

export default Games;
