import { makeStyles, useTheme } from '@material-ui/core/styles'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import AppBar from '@material-ui/core/AppBar'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import Tabs from '@material-ui/core/Tabs'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import Tab from '@material-ui/core/Tab'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import User from '../../utils/User'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  sideTab: {
    backgroundColor: theme.palette.background.paper,
    width: 240,
  },
  otherTab: {
    width:120,
    minWidth: 120
  },
  textLogo: {
    height: 40, 
    width: 'auto',
    margin: 'auto'
  },
  Userprofile: {
    marginBottom: 10, 
  },
  messageList: {
    paddingTop: 0,
  }


}))

const messagelist = [
  {
    username: 'John Doe',
    photo: './images/birdBook2.png'
  },
  {
    username: 'Jane Doe',
    photo: './images/birdBook2.png'
  },
  {
    username: 'Jeff Doe',
    photo: './images/birdBook2.png'
  }
]
const friendlist = [
  {
    username: 'John Doe',
    photo: './images/birdBook2.png'
  },
  {
    username: 'Jane Doe',
    photo: './images/birdBook2.png'
  },
  {
    username: 'Jeff Doe',
    photo: './images/birdBook2.png'
  },
  {
    username: 'Jen Doe',
    photo: './images/birdBook2.png'
  }
]

const Sidebar = ({ handleDrawerToggle }) => {

  const classes = useStyles()
  const theme = useTheme()
  const [value, setValue] = useState(0)
  const [userState, setUserState] = useState({
    user: {},
  })

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  useEffect(() => {
    User.info()
      .then(({ data: user }) => {
        const newUser = user
        setUserState({ ...userState, user: newUser })
      })
  },[])

  return (
    <div>
      <div className={classes.toolbar} >
        <img src='./images/birdBookText.png' alt='text logo' className={classes.textLogo} />
      </div>
      <Box display="flex" alignItems="center" className={classes.Userprofile} >
        <Avatar src='./images/birdBook.png' alt='User' className={classes.large} />
        <h4>{userState.user.username}</h4>
      </Box>
      <div className={classes.sideTab}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"  
        >
            <Tab label="Messages" {...a11yProps(0)} className={classes.otherTab}/>
            <Tab label="Friends" {...a11yProps(1)} className={classes.otherTab}/>
        </Tabs>
      </AppBar>
        <TabPanel value={value} index={0} dir={theme.direction} disablePadding={true}>
          <List className={classes.messageList} >
            {
              messagelist.map((msg, i) => 
                <span key={i}>
                <ListItem alignItems="center">
                  <ListItemAvatar>
                    <Avatar alt={msg.username} src={msg.photo} />
                  </ListItemAvatar>
                  <Link component={RouterLink} to="/message">
                    <ListItemText 
                    primary={msg.username} 
                    onClick={handleDrawerToggle}
                    />
                  </Link>
                </ListItem>
                <Divider />
                </span>
              )
            }
          </List>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <List className={classes.messageList} >
            {
              friendlist.map((friend, i) =>
                <span key={i}>

                  <ListItem alignItems="center">
                    <ListItemAvatar>
                      <Avatar alt={friend.username} src={friend.photo} />
                    </ListItemAvatar>
                    <Link component={RouterLink} to="/message">
                      <ListItemText 
                      primary={friend.username}
                      onClick={handleDrawerToggle}
                      />
                    </Link>
                  </ListItem>
                  <Divider />
                  </span>
              )
            }
          </List>
        </TabPanel>
        </div>
    </div>
  )
}

export default Sidebar