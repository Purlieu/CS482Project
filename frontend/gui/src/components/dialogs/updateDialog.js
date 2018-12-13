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

const renderFormModal = ({
    classes,
    notes,
    rating,
    onUpdateSubmit,
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

                </DialogContent>
            </Dialog>
        </div>
    );

export default withStyles(styles)(renderFormModal);
