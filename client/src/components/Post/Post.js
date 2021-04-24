import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'
import { Divider } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import { useState, useEffect } from 'react'
import Comment from '../../utils/CommentAPI'
import PostAPI from '../../utils/PostAPI'
import User from '../../utils/User'
import { Link as RouteLink } from 'react-router-dom'
import { storage } from '../../components/firebase'
import ReactPlayer from 'react-player'

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
    },
  },
  profileLink: {
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline'
    },
    textDecoration: 'none',
    color: 'black'
  }
}))


const Post = ({ post, userImg }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const [commentState, setCommentState] = useState({
    comment_text: '',
    comments: []
  })

  const [userInfo, setUserInfo] = useState({
    id: ''
  })

  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const isUrl = (string) => {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(string)
  }

  const handleInputChange = ({ target }) => {
    setCommentState({ ...commentState, [target.name]: target.value })
  }

  const handleCreateComment = event => {
    event.preventDefault()
    let newComment = {
      comment_text: commentState.comment_text
    }
    Comment.createComment(newComment, post._id)
      .then(({ data: comment }) => {
        let comments = [...commentState.comments]
        comments.push(comment)
        setCommentState({ ...commentState, comments, comment_text: '' })
      })
      .catch(err => console.log(err))
  }

  const handleCommentSection = event => {
    event.preventDefault()
    setOpen((isOpen) => !isOpen)
  }

  const handleLikes = event => {
    event.preventDefault()

    PostAPI.addLike(post._id)
      .then(() => {
        if(isLiked === false){
          setLikes(likes + 1)
        }
        setIsLiked(true)
        
      })
      .catch(err => console.log(err))
  }

  const handleProfileLink = () => {
    localStorage.setItem('profile', post.author._id)
    // window.location = `/profile/${post.author._id}`
  }

  useEffect(() => {
    setIsLoading(true)
    User.info()
      .then(({ data: user }) => {
        setUserInfo({ ...userInfo, id:user._id })
        for (let i = 0; i < post.likes.length; i++) {
          if (post.likes[i]._id === user._id) {
            setIsLiked(true)
          }
        }
        setIsLoading(false)
      })
    Comment.getComments(post._id)
      .then(({ data: comments }) => {
        setCommentState({ ...commentState, comments })
      })
      .catch(err => console.log(err))
    setLikes(post.likes.length)
  }, [])
  

  return(
    <>
    { isLoading ? null:
    <Grid item xs={9}>
      <Paper className={classes.paper} variant="outlined">
        <Box display="flex" alignItems="center" className={classes.Userprofile} >
          <Avatar src={userImg} alt='User' className={classes.large} />
          <RouteLink 
            className={classes.profileLink} 
            to={`/profile`} 
            onClick={handleProfileLink}
          >
            <Typography variant="h6">{post.author.username}</Typography>
          </RouteLink>
        </Box>
        {/* <Typography variant="body1">{post.post_content}</Typography> */}
        {
          post.post_image !== ''
            ? <img src={post.post_image} alt={post.post_imageName} />
          : null 
        }
        <Typography variant="body1">{isUrl(post.post_content) ? <ReactPlayer url={post.post_content} /> : post.post_content}</Typography>
        <Typography variant="body2">
          <Link>
            {likes ? likes : null}<ThumbUpIcon
              color={isLiked ? 'secondary' : 'primary' }
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
            {
              commentState.comments.length
              ? commentState.comments.map(comment => (
                <span key={comment._id}>
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
                  <Typography variant="subtitle2" >{comment.author.username}</Typography>
                </Box>
                <Typography variant="body2">{comment.comment_text}</Typography>
                <Divider />
                </span>
              ))
              :null
            }
            
            <form onSubmit={handleCreateComment}>
              <TextField
                name="comment_text"
                label="Write a reply"
                multiline
                rows={2}
                variant="outlined"
                fullWidth
                style={{ marginTop: 15 }}
                value={commentState.comment_text}
                onChange={handleInputChange}
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.postButtons}
                size="small"
                onClick={handleCreateComment}
              >Submit</Button>
            </form>
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
    }
  </>
  ) 
}

export default Post