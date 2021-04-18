import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Divider } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import YouTubeIcon from '@material-ui/icons/YouTube'
import ImageIcon from '@material-ui/icons/Image'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import Link from '@material-ui/core/Link'
import { useState } from 'react'



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
  large: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  small: {
    width: theme.spacing(2.5),
    height: theme.spacing(2.5),
  },
  commentLink: {
    marginLeft: 10,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  likeLink: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
}))

const Home = () => {
  const classes = useStyles()
  const[open, setOpen] = useState(false)

  const handleCommentSection = event => {
    event.preventDefault()
    setOpen((isOpen) => !isOpen)
  }

  const handleLikes = event => {
    event.preventDefault()
    console.log('hi')
  }

  return (
    <Grid container
      className={classes.feedContainer}
      spacing={1}
      justify="center"
      xs={12}
    >
      <Grid item xs={9}>
        <Paper className={classes.paper} elevation={1}>
          <Typography variant="h4">
            New Post
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Share your latest news
          </Typography>
          {/* Text area for new post */}
          <TextField
            id="postText"
            label="What do you want to share?"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
          />
            {/* Image Upload Button */}
            <input accept="image/*" className={classes.imgUp} id="contained-button-file" multiple type="file" />
            <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span" startIcon={<ImageIcon />} className={classes.postButtons}>
                Upload
              </Button>
            </label> 
            {/* Youtube Link Button */}
            <Button 
            variant="contained" 
            color="primary" 
            startIcon={<YouTubeIcon />} 
            className={classes.postButtons}>
              Link
            </Button>
            {/* Submit Button */}
          <Button variant="contained" color="primary" className={classes.postButtons}>Submit</Button>
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <Typography variant="h4" gutterBottom>
          Feed:
        </Typography>
        <Divider />
      </Grid>
      <Grid item xs={9}>
        <Paper className={classes.paper} variant="outlined">
          <Box display="flex" alignItems="center" className={classes.Userprofile} >
            <Avatar src='./images/birdBook.png' alt='User' className={classes.large} />
            <Typography variant="h6">Username</Typography>
          </Box>
          <Typography variant="body1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad sequi suscipit, accusantium tenetur, culpa cupiditate labore porro itaque quia omnis facere eos molestias aliquam nam quasi libero perspiciatis. Architecto, maxime!
          Recusandae reiciendis sequi similique velit libero nulla molestias quos, pariatur facere placeat a dicta. Fuga distinctio, recusandae, repellat sapiente placeat reiciendis maiores aspernatur adipisci vel reprehenderit doloribus, totam consectetur pariatur?</Typography>
          <Typography variant="caption text">
            <Link>
              1 <ThumbUpIcon 
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
                siez="small"
              >Submit</Button>
            </Box>
          ) : null}
          
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Home
