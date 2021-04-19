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
      .then(({ data }) => {
        setPostState({ ...postState, text: ''})
        console.log(data)
      }) 
      .catch(err => console.log(err))
  }

  useEffect(() => {
    PostAPI.getPosts()
      .then(({ data }) => {
        console.log(data)
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
      <Post />
      {/* <Grid item xs={9}>
        <Paper className={classes.paper} variant="outlined">
          <Box display="flex" alignItems="center" className={classes.Userprofile} >
            <Avatar src='./images/birdBook.png' alt='User' className={classes.large} />
            <Typography variant="h6">Username</Typography>
          </Box>
          <Typography variant="body1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad sequi suscipit, accusantium tenetur, culpa cupiditate labore porro itaque quia omnis facere eos molestias aliquam nam quasi libero perspiciatis. Architecto, maxime!
          Recusandae reiciendis sequi similique velit libero nulla molestias quos, pariatur facere placeat a dicta. Fuga distinctio, recusandae, repellat sapiente placeat reiciendis maiores aspernatur adipisci vel reprehenderit doloribus, totam consectetur pariatur?</Typography>
          <Typography variant="caption text">
            <Link>
              <ThumbUpIcon 
              style={{ fontSize: 14 }} 
              onClick={handleLikes} 
              className={classes.likeLink} />
            </Link>
            <Link onClick={handleCommentSection} className={classes.commentLink} >
              Comments
            </Link>
          </Typography>
          {open ? (
            <Box>
              <Divider />
              <Typography variant="h6">Comments:</Typography>
              <Box display="flex" alignItems="center" className={classes.Userprofile} >
                <Avatar src='./images/birdBook.png' alt='User' className={classes.small} />
                <Typography variant="subtitle2" >Username</Typography>
              </Box>
              <Typography variant="body2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus aspernatur voluptates eum id, distinctio magni aut sit et dignissimos placeat possimus adipisci illo nostrum iste deserunt velit tempora officia voluptatem!</Typography>
              <Divider />
              <Box display="flex" alignItems="center" className={classes.Userprofile} >
                <Avatar src='./images/birdBook.png' alt='User' className={classes.small} />
                <Typography variant="subtitle2" >Username</Typography>
              </Box>
              <Typography variant="body2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus aspernatur voluptates eum id, distinctio magni aut sit et dignissimos placeat possimus adipisci illo nostrum iste deserunt velit tempora officia voluptatem!</Typography>
              <Divider />
              <Box display="flex" alignItems="center" className={classes.Userprofile} >
                <Avatar src='./images/birdBook.png' alt='User' className={classes.small} />
                <Typography variant="subtitle2" >Username</Typography>
              </Box>
              <Typography variant="body2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus aspernatur voluptates eum id, distinctio magni aut sit et dignissimos placeat possimus adipisci illo nostrum iste deserunt velit tempora officia voluptatem!</Typography>
              <Divider />
              <TextField
                id="commentText"
                label="Write a reply"
                multiline
                rows={2}
                variant="outlined"
                fullWidth
                style={{ marginTop: 15 }}
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.postButtons}
                size="small"
              >Submit</Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.postButtons}
                size="small"
                fullWidth
                onClick={handleCommentSection}
              >Close Comments</Button>
            </Box>
          ) : null}
          
        </Paper>
      </Grid> */}
    </Grid>
  )
}

export default Home
