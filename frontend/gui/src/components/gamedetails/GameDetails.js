import React from "react";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar
} from "@material-ui/core";

const styles =
    {
        media: {
        height: 0,
        paddingTop: '56.25%', // 16:9,
        marginTop:'30'
    }
  };

const Games = ({ name, release_date, url, image, id }) => {
  return (
      <Grid
          style={{paddingTop: 20}}
          onClick={() => {

          }}
      >
           <Paper  style={{padding: 20}}>
               <Grid container spacing={16}>
                   <Grid item>
                       <img className={name} src={image}/>
                   </Grid>
                   <Grid item xs={12} sm container style={{paddingTop: 10}}>
                       <Typography gutterBottom variant="subtitle1" padding={16}>
                           {name}
                       </Typography>
                   </Grid>
                </Grid>
           </Paper>
      </Grid>
  );
};

Games.defaultProps = {
    name: "",
    release_date: "",
    url: "",
    id: 0,
    image: "",
}
Games.propTypes = {
  name: PropTypes.string,
  release_date: PropTypes.string,
  url: PropTypes.string,
    id: PropTypes.number,
  image: PropTypes.string
};

export default Games;
