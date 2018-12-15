import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
  FormHelperText,
  Button
} from "@material-ui/core";

import withStyles from "@material-ui/core/styles/withStyles";
import api from "../../api";

const PASSWORD_UPDATE_SUCCESS = "Password Updated Successfully";
const styles = theme => ({
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  }
});

class ChangePasswordModal extends Component {
  state = {
    modalOpen: false,
    currentPassword: undefined,
    newPassword: undefined,
    confirmNewPassword: undefined,
    passwordChangeError: undefined,
    confirmChangeError: undefined,
    isPasswordSaved: false,
    isPasswordChanged: false
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleClickModal = () => {
    this.setState(state => ({ modalOpen: !state.modalOpen }));
  };

  renderPasswordChange = () => {
    if (this.state.passwordChangeError) {
      return this.state.passwordChangeError[0];
    }
    if (this.state.confirmChangeError) {
      return this.state.confirmChangeError[0];
    }
    console.log(
      this.state.passwordChangeError + " " + this.state.confirmChangeError
    );
    console.log(
      this.state.isPasswordChanged + " " + this.state.isPasswordSaved
    );
    if (this.state.isPasswordSaved && this.state.isPasswordChanged) {
      return PASSWORD_UPDATE_SUCCESS;
    }
    return "";
  };
  handleOnSubmit = event => {
    event.preventDefault();
    api
      .updateUserPassword(
        this.props.user,
        this.state.currentPassword,
        this.state.newPassword,
        this.state.confirmNewPassword
      )
      .then(({ old_password, new_password2 }) => {
        if (old_password !== undefined) {
          this.setState({
            passwordChangeError: old_password,
            isPasswordSaved: false
          });
        } else {
          this.setState({
            passwordChangeError: undefined,
            isPasswordSaved: true
          });
        }
        if (new_password2 !== undefined) {
          this.setState({
            confirmChangeError: new_password2,
            isPasswordChanged: false
          });
        } else {
          this.setState({
            confirmChangeError: undefined,
            isPasswordChanged: true
          });
        }
      });
  };

  render() {
    let { classes } = this.props;
    return (
      <div style={{ width: "100%" }}>
        <Button
          type='submit'
          fullWidth
          variant='outlined'
          color='primary'
          onClick={this.handleClickModal}
        >
          Change Password
        </Button>

        <Dialog
          open={this.state.modalOpen}
          onClose={this.handleClickModal}
          aria-labelledby='form-dialog'
        >
          <DialogTitle id='form-dialog'>Change Password</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleOnSubmit}>
              <FormControl margin='normal' fullWidth>
                <TextField
                  label='Current Password'
                  type='password'
                  onChange={this.handleChange("currentPassword")}
                  error={!!this.state.passwordChangeError}
                  required
                />
              </FormControl>
              <FormControl margin='normal' fullWidth>
                <TextField
                  label='New Password'
                  type='password'
                  onChange={this.handleChange("newPassword")}
                  error={!!this.state.confirmChangeError}
                  required
                />
              </FormControl>
              <FormControl margin='normal' fullWidth>
                <TextField
                  label='Confirm New Password'
                  type='password'
                  onChange={this.handleChange("confirmNewPassword")}
                  error={!!this.state.confirmChangeError}
                  required
                />
              </FormControl>
              <Button
                type='submit'
                fullWidth
                variant='outlined'
                color='primary'
                className={classes.button}
              >
                Submit
              </Button>
              <FormHelperText
                error={
                  !!this.state.passwordChangeError &&
                  !!this.state.passwordChangeError
                }
                style={{ width: "100%" }}
              >
                {this.renderPasswordChange()}
              </FormHelperText>
            </form>
          </DialogContent>
        </Dialog>
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
  withRouter,
  connect(mapStateToProps)
)(ChangePasswordModal);
