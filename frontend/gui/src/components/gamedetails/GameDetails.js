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

const Games = ({ name, release_date, image, index, onGameClick }) => {
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
          <Grid item>
            <img className={name} src={image} />
          </Grid>
          <Grid
            direction='column'
            item
            xs={12}
            sm
            container
            style={{ paddingTop: 6 }}
          >
            <Typography gutterBottom variant='subtitle1' padding={16}>
              {name}
            </Typography>
            <Typography gutterBottom padding={16}>
              Release Date: {release_date}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </ListItem>
  );
};

Games.defaultProps = {
  platform: "",
  name: "",
  release_date: "",
  url: "",
  id: 0,
  image: ""
};
Games.propTypes = {
  platform: PropTypes.string,
  name: PropTypes.string,
  release_date: PropTypes.string,
  url: PropTypes.string,
  id: PropTypes.number,
  image: PropTypes.string
};

export default Games;
