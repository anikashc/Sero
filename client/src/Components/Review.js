import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import StarRatings from 'react-star-ratings';


export default function Review(props) {
    const useStyles = makeStyles((theme) => ({
        paper: {
          maxWidth: '80%',
          marginTop: '1.2rem',
          padding: theme.spacing(2),
          backgroundColor: '#000',
          color: "#fff",
          border: '2px solid #808080'
          
        },
        image: {
          padding: '10 10'
        },
        namestamp: {
          fontWeight: 800,
          fontSize: '1.2rem'
        },
        img: {
          margin: 'auto',
          display: 'block',
          maxWidth: '100%',
          maxHeight: '100%',
        },
        avatar: {
          marginLeft:'auto', 
          marginRight:'auto', 
          marginTop:'auto',
          color: theme.palette.getContrastText(props.color),
          backgroundColor: props.color,
        }
      }));

  const classes = useStyles();

  return (
        <Paper className={classes.paper}>
            <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
                <Avatar className={classes.avatar}>{props.name.charAt(0)}</Avatar>
                <StarRatings
                    rating={props.rating}
                    starRatedColor="#FFDF00"
                    starEmptyColor="#585858"
                    starDimension="1rem"
                    starSpacing="1px"
                />
            </Grid>
            <Grid item xs>
                <Typography className={classes.namestamp}>{props.name}</Typography>
                <Typography>{props.comment}</Typography>
            </Grid>
            </Grid>
        </Paper>
  );
}