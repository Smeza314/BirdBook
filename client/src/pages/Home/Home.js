import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import ImageIcon from '@material-ui/icons/Image'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { Divider } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { storage } from '../../components/firebase'

import { useState, useEffect, Fragment } from 'react'
import Post from '../../components/Post'
import PostAPI from '../../utils/PostAPI'


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.primary.text,
  },
  feedContainer: {
    marginTop: 15,
    maxWidth: '100%'
  },
  imgUp: {
    display: 'none',
  },
  postButtons: {
    margin: theme.spacing(0.5),
  },
  post_image: {
    height: '10%',
    width: 'auto'
  }
}))

const Home = () => {
  const classes = useStyles()

  const [image, setImage] = useState(null)
  const [url, setUrl] = useState('')

  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
     
    }
  }
  
  const [postState, setPostState] = useState({
    text: '',
    image: '',
    posts: []
  })

  const handleInputChange = ({ target }) => {
    setPostState({ ...postState, [target.name]: target.value })
  }

  const handleCreatePost = event => {
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
              const newPost = {
                post_content: postState.text,
                post_image: url,
                post_imageName: image.name
              }
              PostAPI.createPost(newPost)
                .then(({ data: post }) => {
                  const posts = [...postState.posts]
                  posts.push(post)
                  setPostState({ ...postState, posts, text: '' })
                  setUrl('')
                  setImage(null)
                })
                .catch(err => console.log(err))
            })
        }
      )
    } else {
      const newPost = {
        post_content: postState.text
      }
      PostAPI.createPost(newPost)
        .then(({ data: post }) => {
          const posts = [...postState.posts]
          posts.push(post)
          setPostState({ ...postState, posts, text: '' })
        })
        .catch(err => console.log(err))
    }

    
  }

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    PostAPI.getPosts()
      .then(({ data: posts }) => {
        setPostState({ ...postState, posts })
        setIsLoading(false)
      })
      .catch(err => {
        setIsLoading(false)
        console.log(err) 
      })
  }, [])


  return (
    <>
    { isLoading ? null:
    <Grid container
      className={classes.feedContainer}
      spacing={1}
      justify="center"
    >
      <Grid item xs={11} sm={9}>
        <Paper className={classes.paper} variant="outlined">
          <Typography variant="h4">
            New Post
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Share your latest news
          </Typography>
          <form onSubmit={handleCreatePost}>
            {/* Text area for new post */}
            <TextField
              name="text"
              label="What do you want to share?"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={postState.text}
              onChange={handleInputChange}
            />
            {/* Image Upload Button */}
            <input accept="image/*" onChange={handleChange} className={classes.imgUp} id="contained-button-file" multiple type="file" />
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                color="primary"
                component="span"
                startIcon={<ImageIcon />}
                className={classes.postButtons}
              >
                Image
              </Button>
              </label> 
              {/* Submit Button */}
            <Button 
              variant="contained" 
              color="primary" 
              className={classes.postButtons}
              onClick={handleCreatePost}
              
            >
              Submit
            </Button>
          </form>
        </Paper>
      </Grid>
      <Grid item xs={11} sm={9}>
        <Typography variant="h4" gutterBottom>
          Feed: 
        </Typography>
        <Divider />
      </Grid>
      {
        postState.posts.length > 0 
          ? postState.posts.slice(0).reverse().map(post => (
           <>
            <Post 
              key={post._id} 
              post={post}
              userImg={'./images/birdBook.png'}
            />
            
            </>
          ))
          : null
      }
    </Grid>
    }
    </>
  )
}

export default Home
