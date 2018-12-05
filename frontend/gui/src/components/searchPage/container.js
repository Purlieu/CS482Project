import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import * as searchAction from "../../actions/search";
import GameDetails from "../gamedetails/GameDetails"
import requireAuth from "../requireAuth";

class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [],
    };
  }
  componentDidMount() {
    this.props.fetchTopNews();
    this.setState({ games: this.props.fetchGameQuery(this.props.query) });;


  }
  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      await this.props.fetchGameQuery(prevProps.query)
      await this.setStateAsync({ games: this.props.games });
      console.log(this.state.games)
    }
  }

  render() {

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
        <Grid item xs={6} >

        </Grid>
      </Grid>
    );
  }
}

Container.propTypes = {
  query: PropTypes.string.isRequired,

};

function mapStateToProps(state) {
  return {
    query: state.search.query,
  };
}

export default compose(
  requireAuth,
  connect(
    mapStateToProps,
    searchAction
  )
)(Container);
