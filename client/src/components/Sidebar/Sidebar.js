import Avatar from '@material-ui/core/Avatar'
import { makeStyles, useTheme  } from '@material-ui/core/styles'

import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'

import Box from '@material-ui/core/Box'

import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'




const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },


}))

const Sidebar = () => {

  const classes = useStyles()

  return (
    <div>
      <div className={classes.toolbar} />
      <Box display="flex" alignItems="center" >
        <Avatar src='./images/birdBook.png' alt='User' stlye={{ width: 240 }} className={classes.large} />
        <h4>Username</h4>
      </Box>

    </div>
  )
}

export default Sidebar