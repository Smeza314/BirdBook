import Avatar from '@material-ui/core/Avatar'
import { makeStyles, useTheme } from '@material-ui/core/styles'

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
import { useState } from 'react'

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
  }


}))

const Sidebar = () => {

  const classes = useStyles()
  const theme = useTheme()
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <div>
      <div className={classes.toolbar} />
      <Box display="flex" alignItems="center" >
        <Avatar src='./images/birdBook.png' alt='User' className={classes.large} />
        <h4>Username</h4>
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
        <TabPanel value={value} index={0} dir={theme.direction}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, alias officia! Quasi, facilis. Voluptatum optio reprehenderit unde. Distinctio dolores recusandae obcaecati perferendis. Adipisci perferendis quos esse nemo doloribus doloremque repudiandae!
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>
        </div>
    </div>
  )
}

export default Sidebar