import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { ListItem } from "@material-ui/core";

const styles = {
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9,
    marginTop: "30"
  }
};

const MyGames = ({ gameid, notes, rating, title, url, onGameClick, index }) => {
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
      onClick={() => {
        onGameClick(index);
      }}
    >
      <Paper style={{ padding: 20, width: "100%" }}>
        <Grid container spacing={16}>
          <Grid item />
          <Grid
            direction='column'
            item
            xs={12}
            sm
            container
            style={{ paddingTop: 6 }}
          >
            <img src={url} width='100' height='100' />
            <Typography gutterBottom variant='subtitle1' padding={16}>
              {title}
            </Typography>
            <Typography gutterBottom variant='subtitle1' padding={16}>
              Game ID: {gameid}
            </Typography>
            <Typography gutterBottom padding={16}>
              Rating: {rating}
            </Typography>
            <Typography gutterBottom padding={16}>
              Notes: {notes}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </ListItem>
  );
};

MyGames.defaultProps = {
  gameid: "",
  notes: "",
  rating: 0
};
MyGames.propTypes = {
  gameid: PropTypes.string,
  notes: PropTypes.string,
  rating: PropTypes.number
};

export default MyGames;
