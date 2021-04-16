import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { borders } from '@material-ui/system';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  posts: {
    textAlign: 'left'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '35ch',
  },
  media: {
    height: '200px',
    width: '200px'
  },
  header: {
    height: '500px', 
    width: '100%'
  },

   paper2: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginTop: 4,
    marginBottom: 4
  },
  
}));

// const useStyles = makeStyles({
//   root: {
//     maxWidth: 345,
//   },
//   media: {
//     height: 140,
//   },
// });


const Profile = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <Grid container
          direction="column"
          justify="space-evenly"
          alignItems="center" >
          <Grid item xs={8}>
            {/* <Paper className={classes.paper}> */}
              <img
              className={classes.header} 
                src="https://cdn.discordapp.com/attachments/818908729029689351/831993325774962718/wp6053464.jpg" alt=""/>
            {/* </Paper> */}
          </Grid>
          <Grid item xs={8}>
            <Paper className={classes.paper2}>
              <h1>Your Posts</h1>
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper 
            className={classes.posts}
            elevation={3}
            variant="outlined">
              <TextField
                id="outlined-full-width"
                style={{ margin: 8 }}
                placeholder="Post Title goes here"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined">

              </TextField>
                <TextField
                  id="outlined-full-width"
                  style={{ margin: 8 }}
                  placeholder="Post Body goes here"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined">
                </TextField>
                  <TextField
                    id="outlined-full-width"
                    style={{ margin: 8 }}
                    placeholder="Post Author goes here"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined">
                  </TextField>
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper 
            className={classes.posts}
            elevation={3}
              variant="outlined">
            <TextField 
              id="outlined-full-width"
              style={{ margin: 8 }}
              placeholder="Post Title goes here"
              fullWidth
              margin="normal"
              InputLabelProps={{  
                shrink: true,
              }}
              variant="outlined">
              
              </TextField>
                <TextField
                  id="outlined-full-width"
                  style={{ margin: 8 }}
                  placeholder="Post Body goes here"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined">
                </TextField>
                  <TextField
                    id="outlined-full-width"
                    style={{ margin: 8 }}
                    placeholder="Post Author goes here"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined">
                  </TextField>
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paper}>14</Paper>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default Profile