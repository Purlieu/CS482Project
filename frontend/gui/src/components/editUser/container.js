import React, { Component } from "react";
import { compose } from "redux";
import requireAuth from "../requireAuth";
import { Grid, Paper, CssBaseline, Typography } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

import ChangeUserName from "./changeUserName";
import ChangePasswordModal from "./changePasswordModal";

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
  }
});

const User = ({ classes }) => (
  <Grid
    className={classes.root}
    container
    direction='row'
    justify='center'
    alignItems='center'
  >
    <CssBaseline />
    <Paper className={classes.paper} elevation={1}>
      <Grid>
        <Typography component='h1' variant='h5'>
          Edit Credientials
        </Typography>
        <ChangeUserName />
      </Grid>
      <Grid>
        <ChangePasswordModal />
      </Grid>
    </Paper>
  </Grid>
);

export default compose(
  requireAuth,
  withStyles(styles)
)(User);
