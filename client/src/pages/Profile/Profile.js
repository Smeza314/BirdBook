import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { Divider } from '@material-ui/core'
import { useState, useEffect } from 'react'
import User from '../../utils/User'
import Post from '../../components/Post'

import Button from '@material-ui/core/Button'


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
    textAlign: 'left',
    marginBottom: 5
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
    height: '100%', 
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

const Profile = () => {
  const classes = useStyles()

  const [userState, setUserState] = useState({
    user: {
      posts: []
    }
  })


  useEffect(() => {
    User.info()
      .then(({ data: user }) => {
        const newUser = user
        setUserState({ ...userState, user: newUser })
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <div className={classes.root}>
        <Grid container
          direction="column"
          justify="space-evenly"
          alignItems="center" >
          <Grid item xs={9}>
              <img
              className={classes.header} 
                src="https://cdn.discordapp.com/attachments/818908729029689351/831993325774962718/wp6053464.jpg" alt=""/>
          </Grid>
        </Grid>
        <Grid container
          className={classes.feedContainer}
          spacing={1}
          justify="center"
          xs={12}
        >
          <Grid item xs={9}>
              <Typography variant="h4" gutterBottom>
                Your Posts
              </Typography>
            <Divider />
            <Button onClick={() => console.log(userState)}>Click </Button>
          </Grid>
          {
            userState.user.posts.length
              ? userState.user.posts.slice(0).reverse().map(post => (
                <Post
                  post={post}
                  userImg={'./images/birdBook.png'}
                />
              ))
              : null
          }
        </Grid>
      </div>
    </>
  )
}

export default Profile