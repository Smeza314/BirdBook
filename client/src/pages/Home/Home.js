import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import YouTubeIcon from '@material-ui/icons/YouTube'
import TextField from '@material-ui/core/TextField'
import ImageIcon from '@material-ui/icons/Image'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { Divider } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'

import { useState, useEffect } from 'react'
import Post from '../../components/Post'
import PostAPI  from '../../utils/PostAPI'



const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.primary.text,
  },
  feedContainer: {
    marginTop: 15
  },
  imgUp: {
    display: 'none',
  },
  postButtons: {
    margin: theme.spacing(0.5),
  },
}))

const Home = () => {
  const classes = useStyles()

  const [postState, setPostState] = useState({
    text: '',
    posts: []
  })

  const handleInputChange = ({ target }) => {
    setPostState({ ...postState, [target.name]: target.value })
  }

  const handleCreatePost = event => {
    event.preventDefault()
    const newPost = {
      post_content: postState.text
    }
    PostAPI.createPost(newPost)
      .then(({ data: post }) => {
        const posts = [...postState.posts]
        posts.push(post)
        setPostState({ ...postState, posts, text: ''})
      }) 
      .catch(err => console.log(err))
  }

  useEffect(() => {
    PostAPI.getPosts()
      .then(({ data: posts }) => {
        setPostState({ ...postState, posts })
        // console.log(postState.posts)
      })
      .catch(err => console.log(err))
  }, [])


  return (
    <Grid container
      className={classes.feedContainer}
      spacing={1}
      justify="center"
      xs={12}
    >
      <Grid item xs={9}>
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
              <input accept="image/*" className={classes.imgUp} id="contained-button-file" multiple type="file" />
              <label htmlFor="contained-button-file">
              <Button 
                variant="contained" 
                color="primary" 
                component="span" 
                startIcon={<ImageIcon />} 
                className={classes.postButtons}
              >
                Upload
              </Button>
              </label> 
              {/* Youtube Link Button */}
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<YouTubeIcon />} 
                className={classes.postButtons}
              >
                Link
              </Button>
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
      <Grid item xs={9}>
        <Typography variant="h4" gutterBottom>
          Feed:
        </Typography>
        <Divider />
      </Grid>
      {
        postState.posts.length > 0 
          ? postState.posts.slice(0).reverse().map(post => (
            <Post 
              username={post.author.username} 
              content={post.post_content}
              userImg={'./images/birdBook.png'}
            />
          ))
          : null
      }
    </Grid>
  )
}

export default Home
