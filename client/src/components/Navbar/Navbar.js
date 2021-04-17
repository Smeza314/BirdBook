import { makeStyles, useTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from '@material-ui/core/Drawer'
import { useState } from 'react'
import Hidden from '@material-ui/core/Hidden' 
import { Link } from 'react-router-dom'
import '../../App.css'
import Sidebar from '../Sidebar'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    color: theme.palette.secondary.main,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
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
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  toolbar: theme.mixins.toolbar,
}))


const Navbar = (props) => {

  const classes = useStyles()
  const { window } = props
  const theme = useTheme()
  const container = window !== undefined ? () => window().document.body : undefined
  const [mobileOpen, setMobileOpen] = useState(false)
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  
  return (
    <div className={classes.root}>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar variant='dense'>
          <IconButton 
            edge='start' 
            className={classes.menuButton} 
            color='inherit' 
            aria-label='menu'
            onClick={handleDrawerToggle}
          >
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

      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <Sidebar />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <Sidebar />
          </Drawer>
        </Hidden>
      </nav>
    </div>        
  )
}

export default Navbar