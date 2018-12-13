import React from "react";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import FormHelperText from "@material-ui/core/FormHelperText";

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4
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
    <FormHelperText error={!!custom[input.name]}>
      {custom[input.name]}
    </FormHelperText>
  </div>
);

export default withStyles(styles)(renderTextFeild);
