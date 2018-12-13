import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import requireAuth from "../requireAuth";
import classnames from "classnames";
import {
  Grid,
  Typography,
  FormControl,
  MenuItem,
  TextField,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  List
} from "@material-ui/core";

import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import api from "../../api";
import ListHelper from "./listHelper";

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
  }
});

const ratings = [
  {
    value: "1",
    label: "one"
  },
  {
    value: "2",
    label: "two"
  },
  {
    value: "3",
    label: "three"
  },
  {
    value: "4",
    label: "four"
  },
  {
    value: "5",
    label: "five"
  },
  {
    value: "6",
    label: "six"
  },
  {
    value: "7",
    label: "seven"
  },
  {
    value: "8",
    label: "eight"
  },
  {
    value: "9",
    label: "nine"
  },
  {
    value: "10",
    label: "ten"
  }
];

class QueryDetails extends Component {
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
    storylineOpen: false
  };

  handleGameSubmit = event => {
    event.preventDefault();
    api.postToAPI(
      this.state.notes,
      this.state.rating,
      this.props.currentGame.id,
      this.props.currentGame.name,
      this.props.currentGame.cover
        ? this.props.currentGame.cover.url
        : "https://sc.sftcdn.net/images/f1936-d9195.png",
      this.props.user
    );
    this.props.history.push("/home");
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
            </Card>
          </Grid>

          <form onSubmit={this.handleGameSubmit}>
            <FormControl margin='normal' fullWidth>
              <TextField
                label='notes'
                value={this.state.notes}
                onChange={this.handleChange("notes")}
                required
                margin='normal'
              />
            </FormControl>
            <FormControl margin='normal' fullWidth>
              <TextField
                select
                label='rating'
                value={this.state.rating}
                onChange={this.handleChange("rating")}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                helperText='Select Rating'
                margin='normal'
              >
                {ratings.map(rating => (
                  <MenuItem key={rating.value} value={rating.value}>
                    {rating.label}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
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
)(QueryDetails);
