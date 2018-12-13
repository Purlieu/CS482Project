import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import requireAuth from "../requireAuth";
import classNames from "classnames";

import {
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  List,
  Fab
} from "@material-ui/core";

import GamesIcon from "@material-ui/icons/Games";

import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import api from "../../api";
import ListHelper from "./listHelper";
import FormModal from "./formModal";

const styles = theme => ({
  menu: {
    width: 200
  },
  listRoot: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  card: {
    width: "100%"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9,
  },
  actions: {
    display: "flex"
  },
  button: {
    margin: theme.spacing.unit
  },
  saveModalButton: {
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: 8
    }
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  }
});

class Container extends Component {
  state = {
    notes: "",
    rating: 1,
    hasError: false,
    expanded: false,
    developersOpen: false,
    platformOpen: false,
    themeOpen: false,
    engineOpen: false,
    timeToBeatOpen: false,
    storylineOpen: false,
    modalOpen: false
  };

  handleGameSubmit = event => {
    event.preventDefault();
    api
      .postToAPI(
        this.state.notes,
        this.state.rating,
        this.props.currentGame.id,
        this.props.currentGame.name,
        this.props.release_dates
          ? this.props.currentGame.release_dates[0].human
          : "None Listed",
        this.props.currentGame.cover
          ? this.props.currentGame.cover.url
          : "https://sc.sftcdn.net/images/f1936-d9195.png",
        this.props.user
      )
      .then(() => this.props.history.push("/home"));
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handlePlatformClick = () => {
    this.setState(state => ({ platformOpen: !state.platformOpen }));
  };

  handleThemeClick = () => {
    this.setState(state => ({ themeOpen: !state.themeOpen }));
  };

  handleGameEngineClick = () => {
    this.setState(state => ({ engineOpen: !state.engineOpen }));
  };

  handleTimeToBeatClick = () => {
    this.setState(state => ({ timeToBeatOpen: !state.timeToBeatOpen }));
  };

  handleDeveloperClick = () => {
    this.setState(state => ({ developersOpen: !state.developersOpen }));
  };

  handleStorylineClick = () => {
    this.setState(state => ({ storylineOpen: !state.storylineOpen }));
  };

  handleClickModal = () => {
    this.setState(state => ({ modalOpen: !state.modalOpen }));
  };

  renderFirstSetenceOfSummary = summary => {
    // let positionOfSecondPeriod = summary.indexOf(".", summary.indexOf(".") + 1);
    let positionOfFirstPeriod = summary.indexOf(".");
    let result = summary.substring(0, positionOfFirstPeriod);
    return <Typography paragraph>{"Summary: " + result + "."}</Typography>;
  };

  render() {
    try {
      const { classes, currentGame } = this.props;
      return (
        <Grid container alignItems='center' justify='center' direction='column'>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardHeader
                title={currentGame.name}
                subheader={
                  currentGame.release_dates
                    ? "Release Data: " + currentGame.release_dates[0].human
                    : "Release Data: None Listed"
                }
              />

              <CardContent>
                {this.renderFirstSetenceOfSummary(currentGame.summary)}
                <List className={classes.listRoot}>
                  {currentGame.developers ? (
                    <ListHelper
                      items={currentGame.developers}
                      itemOpen={this.state.developersOpen}
                      onItemOpen={this.handleDeveloperClick}
                      title='Developers'
                    />
                  ) : (
                    ""
                  )}

                  {currentGame.platforms ? (
                    <ListHelper
                      items={currentGame.platforms}
                      itemOpen={this.state.platformOpen}
                      onItemOpen={this.handlePlatformClick}
                      title='Platforms'
                    />
                  ) : (
                    ""
                  )}

                  {currentGame.themes ? (
                    <ListHelper
                      items={currentGame.themes}
                      itemOpen={this.state.themeOpen}
                      onItemOpen={this.handleThemeClick}
                      title='Themes'
                    />
                  ) : (
                    ""
                  )}

                  {currentGame.game_engines ? (
                    <ListHelper
                      items={currentGame.game_engines}
                      itemOpen={this.state.engineOpen}
                      onItemOpen={this.handleGameEngineClick}
                      title='Game Engines'
                    />
                  ) : (
                    ""
                  )}

                  {currentGame.time_to_beat ? (
                    <ListHelper
                      items={currentGame.time_to_beat}
                      itemOpen={this.state.timeToBeatOpen}
                      onItemOpen={this.handleTimeToBeatClick}
                      title='Time to Beat'
                    />
                  ) : (
                    ""
                  )}

                  {currentGame.storyline ? (
                    <ListHelper
                      items={[{ type: currentGame.storyline }]}
                      itemOpen={this.state.storylineOpen}
                      onItemOpen={this.handleStorylineClick}
                      title='Storyline'
                    />
                  ) : (
                    ""
                  )}
                </List>
              </CardContent>
              <CardActions className={classes.actions}>
                {currentGame.total_rating ? (
                  <Fab
                    color='primary'
                    aria-label='rating'
                    className={classes.button}
                  >
                    {Math.round(Number(currentGame.total_rating))}
                  </Fab>
                ) : (
                  ""
                )}

                <Button
                  variant='contained'
                  className={classes.saveModalButton}
                  onClick={this.handleClickModal}
                >
                  <GamesIcon className={classNames(classes.leftIcon)} />
                  Save
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <FormModal
            onFormInputChange={this.handleChange}
            notes={this.state.notes}
            rating={this.state.rating}
            onGameSubmit={this.handleGameSubmit}
            onModalClick={this.handleClickModal}
            modalOpen={this.state.modalOpen}
          />
        </Grid>
      );
    } catch (e) {
      return <h1>Error</h1>;
    }
  }
}

function mapStateToProps(state) {
  return {
    currentGame: state.search.currentGame,
    user: state.auth.user
  };
}

export default compose(
  requireAuth,
  withStyles(styles),
  withRouter,
  connect(
    mapStateToProps,
    null
  )
)(Container);
