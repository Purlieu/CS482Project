import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import requireAuth from "./requireAuth";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import api from "../api/index"
import withStyles from "@material-ui/core/styles/withStyles";


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

class User extends Component {
  state = {
    name: "",
  }

  componentDidMount() {
    api.
      getUser(this.props.user)
      .then(user => this.setState({ name: user.username }))
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {

    return (
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
      >
        <Paper>
          <form noValidate autoComplete="off">
            <TextField
              id="userame"
              label="Name"
              placeholder={this.state.name}
              value={this.state.name}
              margin="normal"
              onChange={this.handleChange('name')}

            />
          </form>
        </Paper>
        <Paper>
          <form>

          </form>
        </Paper>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

export default compose(
  requireAuth,
  withStyles(styles),
  connect(mapStateToProps)
)(User);
