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
        let newWindow = window.open();
        newWindow.opener = null;
        newWindow.location = url;
        newWindow.target = "_blank";
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

Games.defaultProps = {
    name: "",
    summary: "",
    url: "",
    image: "",
}
Games.propTypes = {
  name: PropTypes.string,
  summary: PropTypes.string,
  url: PropTypes.string,
  image: PropTypes.string
};

export default Games;
