import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { ListItem } from "@material-ui/core";

const styles = {
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9,
    marginTop: "30"
  }
};

const MyGames = ({ id, gameid, notes, rating, title, url, onGameClick, onDelete, index }) => {
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
      <Card style={{ padding: 20, width: "100%" }}>
        <CardContent
          onClick={() => {
            onGameClick(index);
          }}
        >
          <Grid
            direction='column'
            container
            style={{ paddingTop: 6 }}
          >
            <Typography gutterBottom variant='subtitle1' padding={16}>
              {title}
            </Typography>
            <img src={url} width='100' height='100' />
            <Typography gutterBottom padding={16}>
              Rating: {rating}
            </Typography>
            <Typography gutterBottom padding={16}>
              Notes: {notes}
            </Typography>
          </Grid>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="secondary"
            onClick={() => onDelete(id)}>
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
