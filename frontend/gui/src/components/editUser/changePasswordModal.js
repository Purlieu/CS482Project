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
  Button
} from "@material-ui/core";

import withStyles from "@material-ui/core/styles/withStyles";
import api from "../../api";

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
    confirmNewPassword: undefined
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleClickModal = () => {
    this.setState(state => ({ modalOpen: !state.modalOpen }));
  };

  handleOnSubmit = () => {
    // make api call, send token, this.state.currentPassword, newPassword, confirmNewPassword
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
                <TextField label='Current Password' type='password' />
              </FormControl>
              <FormControl margin='normal' fullWidth>
                <TextField label='New Password' type='password' />
              </FormControl>
              <FormControl margin='normal' fullWidth>
                <TextField label='Confirm New Password' type='password' />
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
