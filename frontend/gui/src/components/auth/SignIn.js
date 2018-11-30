import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import TextField from "../shared/TextField";
import Alert from "../shared/Alert";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Icon from "@material-ui/core/Icon";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";

import * as actions from "../../actions/auth";

const styles = theme => ({
  root: {
    flexGrow: 1
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
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

const validate = values => {
  const errors = {};
  const requiredFields = ["username", "password"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });

  return errors;
};

class SignIn extends Component {
  onSubmit = formProps => {
    this.props.signIn(formProps, () => {
      // on success, route to home page
      this.props.history.push("/home");
    });
  };

  render() {
    const {
      classes,
      handleSubmit,
      pristine,
      submitting,
      loginErrorMessage
    } = this.props;

    return (
      <Grid
        className={classes.root}
        container
        direction='row'
        justify='center'
        alignItems='center'
      >
        <CssBaseline />
        <Alert message={loginErrorMessage} />
        <Paper className={classes.paper} elevation={1}>
          <Typography component='h1' variant='h5'>
            Sign In
          </Typography>

          <form
            noValidate
            className={classes.form}
            onSubmit={handleSubmit(this.onSubmit)}
          >
            <FormControl margin='normal' required fullWidth>
              <Field
                label='User Name'
                name='username'
                type='text'
                component={TextField}
                autoComplete='none'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Icon color='primary'>{"account_circle"}</Icon>
                    </InputAdornment>
                  )
                }}
              />
            </FormControl>
            <FormControl margin='normal' required fullWidth>
              <Field
                label='Password'
                name='password'
                type='password'
                component={TextField}
                autoComplete='none'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Icon color='primary'>{"lock"}</Icon>
                    </InputAdornment>
                  )
                }}
              />
            </FormControl>

            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              disabled={pristine || submitting}
            >
              Sign In
            </Button>
          </form>
        </Paper>
      </Grid>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    loginErrorMessage: state.auth.authError
  };
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    actions
  ),
  withStyles(styles),
  reduxForm({ form: "signin", validate })
)(SignIn);
