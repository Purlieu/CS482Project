import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";

import {
  FormControl,
  TextField,
  Icon,
  InputAdornment,
  FormHelperText
} from "@material-ui/core";
import api from "../../api/index";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
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
  },

  submit: {
    marginBottom: theme.spacing.unit * 3
  }
});

const USERNAME_UPDATE_ON_SUCCESS_MESSAGE = "Username Updated!";

class ChangeUserName extends Component {
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
      <div>
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
                label='Username'
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
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(ChangeUserName);
