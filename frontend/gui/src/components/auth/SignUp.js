import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TextField from "../shared/TextField";

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
  const requiredFields = ["username", "email", "password1", "password2"];
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

  if (values.password1 !== values.password2) {
    errors.password2 = "Entered passwords are not the same";
  }
  return errors;
};

class SignUp extends Component {
  onSubmit = formProps => {
    this.props.signUp(formProps, () => {
      // on success, route to home page
    });
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
        <Paper className={classes.paper} elevation={1}>
          <Typography component='h1' variant='h5'>
            Sign Up
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
                label='Email Address'
                name='email'
                type='email'
                component={TextField}
                autoComplete='none'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Icon color='primary'>{"email"}</Icon>
                    </InputAdornment>
                  )
                }}
              />
            </FormControl>
            <FormControl margin='normal' required fullWidth>
              <Field
                label='Password'
                name='password1'
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
            <FormControl margin='normal' required fullWidth>
              <Field
                label='Confirm Password'
                name='password2'
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
              Sign Up
            </Button>
          </form>
        </Paper>
      </Grid>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  connect(
    null,
    actions
  ),
  withStyles(styles),
  reduxForm({ form: "signup", validate })
)(SignUp);
