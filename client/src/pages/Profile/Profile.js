import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import { useState, useEffect } from 'react'
import PostAPI from '../../utils/PostAPI'
import Post from '../../components/Post'
import User from '../../utils/User'


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
  feedContainer: {
    marginTop: 15,
    maxWidth: '100%'
  },
  
}));

const Profile = () => {
  const classes = useStyles()

  const [userState, setUserState] = useState({
    user: {},
  })
  const [profileState, setProfileState] = useState({
    profile: {},
  })
  const [postState, setPostState] = useState({
    posts: []
  })
  const [isFriend, setIsFriend] = useState(false)

  const handleAddFriend = event => {
    event.preventDefault()
    User.addFriend(localStorage.getItem('profile'))
      .then(() => {
        setIsFriend(true)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    User.info()
      .then(({ data: user }) => {
        const newUser = user
        setUserState({ ...userState, user: newUser })
        for (let i = 0; i < user.friends.length; i++) {
          console.log(localStorage.getItem('profile'))
          if (user.friends[i]._id === localStorage.getItem('profile')) {
            setIsFriend(true)
          }
        }
      })
      .catch(err => console.log(err))
    PostAPI.getUserPosts(localStorage.getItem('profile'))
      .then(({ data: posts }) => {
        setPostState({ ...postState, posts })
      })
      .catch(err => console.log(err))
    User.profileInfo(localStorage.getItem('profile'))
      .then(({ data: profile }) => {
        setProfileState({ ...profileState, profile })
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
          justify="center"
          className={classes.feedContainer}
          spacing={1}
        >
          
        </Grid>
        <Grid container
          className={classes.feedContainer}
          spacing={1}
          justify="center"
          
        >  
          {profileState.profile._id === userState.user._id
            ? <>
              <Grid item xs={9}>
              <Button color='primary' variant='contained'>Edit Profile Picture</Button>
              <Button color='primary'>Edit Banner Picture</Button>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h4" gutterBottom>
                  Your Posts
                </Typography>
                <Divider />
              </Grid>
              </>
            : <>
              <Grid item xs={9}>
                {isFriend ?
                  <Button color='primary' variant='contained' disabled>Add Friend</Button>
                : <Button color='primary' variant='contained' onClick={handleAddFriend}>Add Friend</Button>
                }
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h4" gutterBottom>
                  {profileState.profile.username}'s Posts
                </Typography>
                <Divider />
              </Grid>
              </>
          }
          {
            postState.posts.length > 0
              ? postState.posts.slice(0).reverse().map(post => (
                <Post
                  key={post._id}
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