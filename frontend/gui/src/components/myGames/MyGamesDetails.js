import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CardActions,
  Typography,
  Button,
  ListItem
} from "@material-ui/core";

const styles = {
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9,
    marginTop: "30"
  }
};

const MyGames = ({
  id,
  gameid,
  notes,
  rating,
  title,
  url,
  onGameClick,
  onDelete,
  index
}) => {
  return (
    <ListItem
      style={{
        paddingTop: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0,
        marginBottom: 10,
        width: "75%",
        justifyContent: "center"
      }}
      button
    >
      <Card style={{ width: "100%" }}>
        <CardHeader
          title={title}
          onClick={() => {
            onGameClick(index);
          }}
        />
        <CardMedia
          style={{ height: 100, width: 100, marginLeft: 25 }}
          image={url}
          title={title}
          onClick={() => {
            onGameClick(index);
          }}
        />

        <CardContent
          onClick={() => {
            onGameClick(index);
          }}
        >
          <Typography gutterBottom padding={16}>
            Rating: {rating}
          </Typography>
          <Typography gutterBottom padding={16} noWrap>
            Notes: {notes}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => onDelete(id)}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </ListItem>
  );
};

MyGames.defaultProps = {
  gameid: "",
  notes: "",
  id: 0,
  rating: 0
};
MyGames.propTypes = {
  id: PropTypes.number,
  gameid: PropTypes.string,
  notes: PropTypes.string,
  rating: PropTypes.number
};

export default MyGames;
