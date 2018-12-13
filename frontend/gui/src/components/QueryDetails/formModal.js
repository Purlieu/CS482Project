import React, { Component } from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  MenuItem,
  TextField
} from "@material-ui/core";

import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import api from "../../api";

const styles = theme => ({
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  }
});

const ratings = [
  {
    value: "1",
    label: "one"
  },
  {
    value: "2",
    label: "two"
  },
  {
    value: "3",
    label: "three"
  },
  {
    value: "4",
    label: "four"
  },
  {
    value: "5",
    label: "five"
  },
  {
    value: "6",
    label: "six"
  },
  {
    value: "7",
    label: "seven"
  },
  {
    value: "8",
    label: "eight"
  },
  {
    value: "9",
    label: "nine"
  },
  {
    value: "10",
    label: "ten"
  }
];

const renderFormModal = ({
  classes,
  onFormInputChange,
  notes,
  rating,
  onGameSubmit,
  onModalClick,
  modalOpen
}) => (
  <div>
    <Dialog
      open={modalOpen}
      onClose={onModalClick}
      aria-labelledby='form-dialog'
    >
      <DialogTitle id='form-dialog'>Save Game</DialogTitle>
      <DialogContent>
        <form onSubmit={onGameSubmit}>
          <FormControl margin='normal' fullWidth>
            <TextField
              autoFocus
              label='notes'
              value={notes}
              onChange={onFormInputChange("notes")}
              required
              margin='normal'
            />
          </FormControl>
          <FormControl margin='normal' fullWidth>
            <TextField
              select
              label='rating'
              value={rating}
              onChange={onFormInputChange("rating")}
              SelectProps={{
                MenuProps: {
                  className: classes.menu
                }
              }}
              helperText='Select Rating'
              margin='normal'
            >
              {ratings.map(rating => (
                <MenuItem key={rating.value} value={rating.value}>
                  {rating.label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <Button
            type='submit'
            fullWidth
            variant='contained'
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

export default withStyles(styles)(renderFormModal);
