import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Divider } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
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
  large: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  postButtons: {
    margin: theme.spacing(0.5),
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


const Post = ({ username, content, userImg }) => {

  // Example Post Data:
  // const postData = {
  //   userPostImg: './images/birdBook.png',
  //   postUsername: 'Username',
  //   postText: `
  //         Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad sequi suscipit, accusantium tenetur, culpa cupiditate labore porro itaque quia omnis facere eos molestias aliquam nam quasi libero perspiciatis. Architecto, maxime!
  //         Recusandae reiciendis sequi similique velit libero nulla molestias quos, pariatur facere placeat a dicta. Fuga distinctio, recusandae, repellat sapiente placeat reiciendis maiores aspernatur adipisci vel reprehenderit doloribus, totam consectetur pariatur?`
  // }



  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleCommentSection = event => {
    event.preventDefault()
    setOpen((isOpen) => !isOpen)
  }

  const handleLikes = event => {
    event.preventDefault()
    console.log('hi')
  }

  return(
    <Grid item xs={9}>
      <Paper className={classes.paper} variant="outlined">
        <Box display="flex" alignItems="center" className={classes.Userprofile} >
          <Avatar src={userImg} alt='User' className={classes.large} />
          <Typography variant="h6">{username}</Typography>
        </Box>
        <Typography variant="body1">{content}</Typography>
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
            <Box 
              display="flex" 
              alignItems="center" 
              className={classes.Userprofile} 
            >
              <Avatar 
                src='./images/birdBook.png' 
                alt='User' 
                className={classes.small} 
              />
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
    </Grid>
  ) 
}

export default Post