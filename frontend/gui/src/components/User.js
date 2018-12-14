import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import requireAuth from "./requireAuth";
import {
  Grid,
  Paper,
  FormControl,
  TextField,
  Icon,
  InputAdornment,
  FormHelperText,
  CssBaseline,
  Typography,
  Button
} from "@material-ui/core";
import api from "../api/index";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%"
  },

  container: {
    display: "flex",
    flexWrap: "wrap"
  },

  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },

  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },

  textFieldContainer: {
    display: "contents"
  }
});

const USERNAME_UPDATE_ON_SUCCESS_MESSAGE = "Username Updated!";

class User extends Component {
  state = {
    name: "",
    nameSaveError: undefined,
    isNameSaved: false
  };

  componentDidMount() {
    api
      .getUser(this.props.user)
      .then(user => this.setState({ name: user.username }));
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleEditUserName = event => {
    event.preventDefault();

    api
      .updateUserName(this.props.user, this.state.name)
      .then(({ username }) => {
        if (username !== this.state.name) {
          // django puts the error message in username - very ugly
          this.setState({ nameSaveError: username, isNameSaved: false });
        } else {
          this.setState({ nameSaveError: undefined, isNameSaved: true });
        }
      });
  };

  renderOnEditNameSuccess = () => {
    if (this.state.nameSaveError) {
      return this.state.nameSaveError[0];
    }
    if (this.state.isNameSaved) {
      return USERNAME_UPDATE_ON_SUCCESS_MESSAGE;
    }
    return "";
  };

  render() {
    let { classes } = this.props;
    return (
      <Grid
        className={classes.root}
        container
        direction='row'
        justify='center'
        alignItems='center'
      >
        <CssBaseline />
        <Paper className={classes.paper} elevation={1}>
          <Typography component='h1' variant='h5'>
            Edit your Username
          </Typography>
          <form
            noValidate
            autoComplete='off'
            onSubmit={this.handleEditUserName}
            className={classes.form}
          >
            <FormControl margin='normal' required fullWidth>
              <div className={classes.textFieldContainer}>
                <TextField
                  style={{ width: "100%" }}
                  id='userame'
                  label='Name'
                  placeholder={this.state.name}
                  value={this.state.name}
                  margin='normal'
                  onChange={this.handleChange("name")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Icon color='primary'>{"account_circle"}</Icon>
                      </InputAdornment>
                    )
                  }}
                  variant='outlined'
                  error={!!this.state.nameSaveError}
                />
                <FormHelperText
                  error={!!this.state.nameSaveError}
                  style={{ width: "100%" }}
                >
                  {this.renderOnEditNameSuccess()}
                </FormHelperText>
              </div>
            </FormControl>

            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Submit!
            </Button>
          </form>
        </Paper>
        <Paper>
          <form />
        </Paper>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

export default compose(
  requireAuth,
  withStyles(styles),
  connect(mapStateToProps)
)(User);
