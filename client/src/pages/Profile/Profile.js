import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import { useState, useEffect } from 'react'
import PostAPI from '../../utils/PostAPI'
import Post from '../../components/Post'
import User from '../../utils/User'
import ProfileCard from '../../components/ProfileCard'
import { storage } from '../../components/firebase'
import ImageIcon from '@material-ui/icons/Image'


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
    height: '35vh', 
    width: '100%',
    overflow: 'hidden',
    display: 'flex'
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
  imgUp: {
    display: 'none'
  },
  headerImg: {
    flex: 'none',
    // minHeight: '100%',
    minWidth: '100%',
    // position: 'absolute',
    // left: '50%',
    // top: '50%',
  }
  
}));

const Profile = () => {
  const classes = useStyles()

  const [open, setOpen] = useState(false)

  const [close, setClose] = useState(false)

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

  const [image, setImage] = useState(null)
  const [url, setUrl] = useState('')

  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])

    }
  }

  const handleOpenProfile = event => {
    event.preventDefault()
    setOpen((isOpen) => !isOpen)
  }

  const handleOpenBanner = event => {
    event.preventDefault()
    setClose((isClose) => !isClose)
  }

  const handleEditProfile = event => {
    event.preventDefault()
    if (image !== null) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image)
      uploadTask.on(
        'state_changed',
        snapshot => { },
        error => {
          console.log(error)
        },
        () => {
          storage
            .ref('images')
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              setUrl(url)
              console.log(url)
              const profilePic = {
                profileImage: url
              }
              User.editProfile(profilePic)
                .then(({ data: newUser }) => {
                  setUserState({ ...userState, user: newUser })
                  setUrl('')
                  setImage(null)
                })
                .catch(err => console.log(err))
            })
        }
      )
    }
  }

  const handleEditBanner = event => {
    event.preventDefault()
    if (image !== null) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image)
      uploadTask.on(
        'state_changed',
        snapshot => { },
        error => {
          console.log(error)
        },
        () => {
          storage
            .ref('images')
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              setUrl(url)
              console.log(url)
              const bannerPic = {
                bannerImage: url
              }
              User.editProfile(bannerPic)
                .then(({ data: newUser }) => {
                  setUserState({ ...userState, user: newUser })
                  setUrl('')
                  setImage(null)
                })
                .catch(err => console.log(err))
            })
        }
      )
    }
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
              
            <div className={classes.header} >
              <img className={classes.headerImg} src={userState.user.bannerImage} alt=""/>
            </div>
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
          
          <Grid item xs={9}>
            <ProfileCard />
          </Grid>
          {profileState.profile._id === userState.user._id
            ? <>
              <Grid item xs={9}>
                <Button 
                  onClick={handleOpenProfile} 
                  color='primary'
                >Edit Profile Picture</Button>
                <Button 
                  onClick={handleOpenBanner} 
                  color='primary'
                >Edit Banner Picture</Button>
                {close ? (
                  <div>
                    <input accept="image/*" onChange={handleChange} className={classes.imgUp} id="contained-button-file" multiple type="file" />
                    <label htmlFor="contained-button-file">
                      <Button
                        style={{ marginRight: 10 }}
                        variant="contained"
                        color="primary"
                        component="span"
                        startIcon={<ImageIcon />}
                        className={classes.postButtons}
                      >
                        Image
                      </Button>
                    </label>
                    <Button 
                      color='primary' 
                      variant='contained' 
                      onClick={handleEditBanner}
                      >Upload Banner Picture</Button>
                  </div>
                  ) : null}
                {open ? (
                  <div style={{marginTop: 10}}>
                    <input accept="image/*" onChange={handleChange} className={classes.imgUp} id="contained-button-file" multiple type="file" />
                    <label htmlFor="contained-button-file">
                      <Button
                        style={{ marginRight: 10 }}
                        variant="contained"
                        color="primary"
                        component="span"
                        startIcon={<ImageIcon />}
                        className={classes.postButtons}
                      >
                        Image
                      </Button>
                    </label>
                    <Button 
                    color='primary' 
                    onClick={handleEditProfile} 
                    variant='contained'
                    > Upload Profile Picture</Button>
                  </div>
                  ) : null}
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