import React, { Component } from "react";
import PropTypes from "prop-types";

import GameDetails from "./GameDetails";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import Pagination from "material-ui-flat-pagination";

class GameDetails extends Component {
    state = { offset: 0, limit: 10 };

    handleClick = offset => {
        this.setState({ offset });
    };

    renderNews = gameSearch => {
        let currentGameSearch;

        if (this.state.offset === 0) {
            currentGameSearch = gameSearch.slice(0, this.state.limit);
        } else {
            currentGameSearch = gameSearch.slice(
                this.state.offset,
                this.state.offset + this.state.limit
            );
        }

        return currentGameSearch.map(games => {
            return (
                <GameDetails
                    GameDetails={games.title}
                    description={games.description}
                    url={games.url}
                    key={games.title}
                    image={games.urlToImage}
                />
            );
        });
    };

    render() {
        let { listofGames } = this.props;
        return (
            <div>
                <List>{this.renderNews(listofGames)}</List>
                <Grid container justify='center'>
                    <Pagination
                        limit={this.state.limit}
                        offset={this.state.offset}
                        total={currentGameSearch.length}
                        onClick={(e, offset) => this.handleClick(offset)}
                        currentPageColor='inherit'
                    />
                </Grid>
            </div>
        );
    }
}

GAmeDetails.propTypes = {
    listofGames: PropTypes.array.isRequired
};

export default GAmeDetails;
