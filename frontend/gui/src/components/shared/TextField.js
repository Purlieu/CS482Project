import React from "react";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import FormHelperText from "@material-ui/core/FormHelperText";

const styles = theme => ({
  divStyle: {
    display: "contents"
  }
});

const renderTextFeild = ({
  classes,
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <div className={classes.divStyle}>
    <TextField
      label={label}
      error={touched && !!error}
      {...input}
      {...custom}
    />
    <FormHelperText error={touched && !!error}>{error}</FormHelperText>
  </div>
);

export default withStyles(styles)(renderTextFeild);
