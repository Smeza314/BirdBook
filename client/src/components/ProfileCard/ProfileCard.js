import React from 'react';
import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import User from '../../utils/User'
import { Avatar } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({ 
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  leftPic: {
    width: '10%',
    float: 'left',
    // overflow: 'hidden'
  },
  rightPic: {
    // width: '80%',
    // float: 'right'
  },
  large: {
    width: '100%',
    height: '100%',
    // margin: 10,
  }
}))

export default function ProfileCard({ user }) {
  const classes = useStyles();

  const [ userState, setUserState ] = useState({
    user: {}
  })

  useEffect(() => {
    User.info()
      .then(({ data: user }) => {
        const newUser = user
        setUserState({ ...userState, user: newUser })
      })
  })

  return (
    <Card className={classes.root} variant="outlined">
      {/* <div className={classes.leftPic}>
        <img src={userState.user.profileImage} alt={userState.user.username} className={classes.large}/>
      </div> */}
      <Grid container>
        <Grid item xs={2}>
          <CardMedia
            className={classes.large}
            image={userState.user.profileImage}
            title={userState.user.username}
            />
        </Grid>
        <Grid item xs={10}>
          <CardContent>
            <div className={classes.rightPic}>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                {userState.user.username}
              </Typography>
              <Typography variant="h5" component="h2">
                {userState.user.name}
              </Typography>
              <Typography variant="body2" component="p">
                {userState.user.email}
              </Typography>
            </div>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}
