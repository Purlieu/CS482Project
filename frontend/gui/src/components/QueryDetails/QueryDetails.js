import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import requireAuth from "../requireAuth";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import { TextField } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import api from "../../api";

const styles = theme => ({
    menu: {
        width: 200,
    },
});

const ratings = [
    {
        value: '1',
        label: 'one',
    },
    {
        value: '2',
        label: 'two',
    },
    {
        value: '3',
        label: 'three',
    },
    {
        value: '4',
        label: 'four',
    },
    {
        value: '5',
        label: 'five',
    },
    {
        value: '6',
        label: 'six',
    },
    {
        value: '7',
        label: 'seven',
    },
    {
        value: '8',
        label: 'eight',
    },
    {
        value: '9',
        label: 'nine',
    },
    {
        value: '10',
        label: 'ten',
    },


]

class QueryDetails extends Component {
    state = {
        notes: "",
        rating: 1
    }
    handleGameSubmit = event => {
        event.preventDefault();
        console.log(this.props.currentGame)
        let image = "";
        if (this.props.currentGame.cover === undefined) {
            image = "https://sc.sftcdn.net/images/f1936-d9195.png";
        }
        else {
            image = this.props.currentGame.cover.url;
        }
        api.postToAPI(
            this.state.notes,
            this.state.rating,
            this.props.currentGame.id,
            this.props.currentGame.name,
            image,
            this.props.user)
        this.props.history.push('/home')

    };
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    render() {
        const {
            classes
        } = this.props
        return (
            <Grid
                container
                alignItems="center"
                justify="center"
                direction="column"
            >
                <Typography variant='h3'>{this.props.currentGame.name}</Typography>
                <Typography variant='subtitle1'>{this.props.currentGame.summary}</Typography>
                <form onSubmit={this.handleGameSubmit} >
                    <FormControl
                        margin='normal'
                        fullWidth
                    >
                        <TextField
                            label="notes"
                            value={this.state.notes}
                            onChange={this.handleChange('notes')}
                            required
                            margin="normal"
                        >
                        </TextField>
                    </FormControl>
                    <FormControl
                        margin='normal'
                        fullWidth
                    >
                        <TextField
                            select
                            label="rating"
                            value={this.state.rating}
                            onChange={this.handleChange('rating')}
                            SelectProps={{
                                MenuProps: {
                                    className: classes.menu,
                                }
                            }}
                            helperText="Select Rating"
                            margin="normal"
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
                        className={classes.submit}
                    >
                        Submit
                </Button>
                </form>
            </Grid>
        )
    }
}


function mapStateToProps(state) {
    return {
        currentGame: state.search.currentGame,
        user: state.auth.user
    };
}

export default compose(
    requireAuth,
    withStyles(styles),
    withRouter,
    connect(
        mapStateToProps,
        null
    ),
)(QueryDetails);