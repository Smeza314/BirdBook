import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'

import { Link } from 'react-router-dom'
import '../../App.css'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    display: 'flex'
  },
  menuButton: {
    // marginRight: theme.spacing(2),
    color: theme.palette.secondary.main
  },
  title: {
    flexGrow: 1

  },
  link: {
    textDecoration: 'none',
    color: theme.palette.secondary.main
  },


  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    marginBottom: 4
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  // content: {
  //   flexGrow: 1,
  //   padding: theme.spacing(3),
  // },
}))

const Navbar = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar variant='dense'>
          <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu'>
            <MenuIcon />
          </IconButton>
          <img className='Logo' alt='logo' src='/images/birdBook2.png' />
          <Typography variant='h6' className={classes.title}>
          <Link to='/' className={classes.link}>
            <Button color='inherit'>Feed</Button>
          </Link>
          <Link to='/profile' className={classes.link}>
            <Button color='inherit'>Profile</Button>
          </Link>
          </Typography>
          <Link to='/login' className={classes.link}>
            <Button color='inherit'>Sign Out</Button>
          </Link>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </div>        
  )
}

export default Navbar