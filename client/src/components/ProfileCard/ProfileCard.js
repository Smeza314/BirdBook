import React from 'react';
import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import User from '../../utils/User'


const useStyles = makeStyles({
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
});

export default function ProfileCard({ user }) {
  const classes = useStyles();

  const [ userState, setUserState ] = useState({
    user: {}
  })

  useEffect(() => {
    User.profileInfo(localStorage.getItem('profile'))
      .then(({ data: user }) => {
        const newUser = user
        setUserState({ ...userState, user: newUser })
      })
  })

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {userState.user.username}
        </Typography>
        <Typography variant="h5" component="h2">
          {userState.user.name}
        </Typography>
        <Typography variant="body2" component="p">
          {userState.user.email}
        </Typography>
      </CardContent>
    </Card>
  );
}
