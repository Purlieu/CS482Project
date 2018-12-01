import React, { Component } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import classNames from "classnames";
import ErrorIcon from "@material-ui/icons/Error";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  error: {
    backgroundColor: theme.palette.error.dark
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: "flex",
    alignItems: "center"
  },
  margin: {
    marginRight: theme.spacing.unit,
    marginLeft: theme.spacing.unit
  }
});

class Alert extends Component {
  render() {
    let { classes, message } = this.props;

    return (
      <Snackbar
        className={classNames(classes.margin)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        open={!!message}
        autoHideDuration={6000}
      >
        <SnackbarContent
          className={classes.error}
          aria-describedby='client-snackbar'
          message={
            <span id='client-snackbar' className={classes.message}>
              <ErrorIcon
                className={classNames(classes.icon && classes.iconVariant)}
              />
              {message}
            </span>
          }
        />
      </Snackbar>
    );
  }
}

export default withStyles(styles)(Alert);
