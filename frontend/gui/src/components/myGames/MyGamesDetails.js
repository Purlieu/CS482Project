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
  ListItem,
  Paper
} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { blue } from "@material-ui/core/colors";

const GREY = "#9E9E9E";


const styles = {
  media: {
    height: 0,
    height: 100,
    width: 100,
    marginLeft: 25,
    padding: "5%",
    boxShadow: `3px 5px 3px ${GREY}`,
  },
  TitleField: {
    padding: "3%",
    wrap: "break-word"
  }
};
const MyGames = ({
  classes,
  id,
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
        width: "80%",
        justifyContent: "center",
      }}
      button
    >
      <Paper elevation10 style={{ width: "95%" }}	>

        <Card style={{ width: "100%", shadow: 3 }}>
          <Typography variant="h6" component="h2"
            noWrap
            align='center'
            className={classes.TitleField}
            onClick={() => {
              onGameClick(index);
            }}
          >{title}</Typography>
          <CardMedia
            className={classes.media}
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
      </Paper>

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

export default withStyles(styles)(MyGames);
