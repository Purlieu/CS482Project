import React from "react";

import { Collapse, List, ListItem, ListItemText } from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 10
  }
});

const renderListItem = ({ items, classes, itemOpen, onItemOpen, title }) => (
  <List component='div' disablePadding>
    <ListItem button onClick={onItemOpen} disableGutters divider>
      <ListItemText inset primary={title} />
      {itemOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
    </ListItem>

    <Collapse in={itemOpen} timeout='auto' unmountOnExit>
      <List component='div'>
        {items.map(item => {
          return title === "Developers" ? (
            <ListItem key={item.name} className={classes.nested}>
              <ListItemText>{item.name}</ListItemText>
            </ListItem>
          ) : (
            <ListItem key={item.type} className={classes.nested}>
              <ListItemText>{item.type}</ListItemText>
            </ListItem>
          );
        })}
      </List>
    </Collapse>
  </List>
);
export default withStyles(styles)(renderListItem);
