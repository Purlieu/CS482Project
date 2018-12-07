import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as searchAction from "../actions/search";

import { withStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Button
} from "@material-ui/core";
import ClearAll from "@material-ui/icons/ClearAll";

const styles = theme => ({
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

class RecentSearches extends Component {
  render() {
    const { classes } = this.props;
    let pastSearches = [...this.props.pastSearches];
    pastSearches.reverse();
    pastSearches = pastSearches.slice(0, 5);
    return (
      <div>
        {pastSearches.length > 0 ? (
          <Typography component='h2' variant='h5' gutterBottom>
            Recent Searches...
          </Typography>
        ) : (
          ""
        )}
        <List>
          {pastSearches.map((query, index) => {
            return (
              <ListItem
                alignItems='flex-start'
                divider
                button
                onClick={() => {
                  // search for query
                  this.props.fetchGameQuery(query, () => {});
                }}
                key={query + index}
              >
                <ListItemText primary={query} />
              </ListItem>
            );
          })}
        </List>

        {pastSearches.length > 0 ? (
          <Button
            variant='contained'
            onClick={() => this.props.clearRecentSearches()}
          >
            Clear All
            <ClearAll className={classes.rightIcon} />
          </Button>
        ) : (
          ""
        )}
      </div>
    );
  }
}

RecentSearches.propTypes = {
  listOfSearches: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    pastSearches: state.search.pastSearches
  };
}

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    searchAction
  )
)(RecentSearches);
