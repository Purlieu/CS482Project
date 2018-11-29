import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TextField from "../shared/TextField";

import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

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
  const requiredFields = ["email", "password"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  return errors;
};

class SignIn extends Component {
  onSubmit = formProps => {
    console.log(formProps);
  };

  render() {
    const { classes, handleSubmit, pristine, submitting } = this.props;

    return (
      <Grid
        className={classes.root}
        container
        direction='row'
        justify='center'
        alignItems='center'
      >
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>

          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>

          <form
            noValidate
            className={classes.form}
            onSubmit={handleSubmit(this.onSubmit)}
          >
            <FormControl margin='normal' required fullWidth>
              <Field
                label='Email Address'
                name='email'
                type='email'
                component={TextField}
                autoComplete='none'
              />
            </FormControl>
            <FormControl margin='normal' required fullWidth>
              {/* <InputLabel htmlFor='password'>Password</InputLabel> */}
              <Field
                label='Password'
                name='password'
                type='password'
                component={TextField}
                autoComplete='none'
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
              Sign in
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

export default compose(
  withStyles(styles),
  reduxForm({ form: "signup", validate })
)(SignIn);
