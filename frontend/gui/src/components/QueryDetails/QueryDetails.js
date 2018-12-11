import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import requireAuth from "../requireAuth";
import Typography from "@material-ui/core/Typography";

class QueryDetails extends Component {

    render() {
        return (
            <Grid
                container
                alignItems="center"
                justify="center"
                direction="column"
            >
                <Typography variant='h3'>{this.props.game.name}</Typography>
            </Grid>
        )
    }

}

function mapStateToProps(state) {
    return {
        game: state.search.currentGame,
    };
}

export default compose(
    requireAuth,
    withRouter,
    connect(
        mapStateToProps,
        null
    )
)(QueryDetails);