import React from "react";
import PropTypes from "prop-types";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar
} from "@material-ui/core";

const Games = ({ name, summary, url, image }) => {
  return (
    <ListItem
      alignItems='flex-start'
      divider
      button
      onClick={() => {
        // navigate to more detail view
      }}
    >
      <ListItemAvatar>
        <Avatar src={image} />
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={<React.Fragment>{summary}</React.Fragment>}
      />
    </ListItem>
  );
};

Games.propTypes = {
  name: PropTypes.string,
  summary: PropTypes.string,
  url: PropTypes.string,
  image: PropTypes.string
};

export default Games;
