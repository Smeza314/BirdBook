import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { Link } from 'react-router-dom'
import { createMuiTheme } from '@material-ui/core/styles'
import '../../App.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.secondary.main
  }
}))

const Navbar = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar variant='dense'>
          <img className='Logo' alt='logo' src= '/images/birdBook2.png'/>
          {/* <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu'>
            <MenuIcon />
          </IconButton> */}
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
    </div>
            
  )
}

export default Navbar