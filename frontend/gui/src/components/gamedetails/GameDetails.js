import React from "react";
import PropTypes from "prop-types";
import {
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar
} from "@material-ui/core";

const GameDetails = ({ title, description, url, image }) => {
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
                primary={title}
                secondary={<React.Fragment>{description}</React.Fragment>}
            />
        </ListItem>
    );
};

GameDetails.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
};

export default GameDetails;
