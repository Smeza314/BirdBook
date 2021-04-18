import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'



import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Message from './pages/Message'
import Navbar from './components/Navbar'
import Footer from './components/stickyFooter'
import { Fragment } from 'react'


import { Fragment } from 'react'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#60ad5e',
      main: '#29b6f6',
      dark: '#005005',
      contrastText: '#fff',
    },
    secondary: {
      light: '#212121',
      main: '#424242',
      dark: '#000000',
      contrastText: '#000',
    },
  },
})

function PrivateRoute({ children, ...rest }) {
  return (
    <Route { ...rest } render={({ location }) => {
      return (localStorage.getItem('user'))
        ? children
        : <Redirect to={{
          pathname: '/login',
          state: { from: location }
        }}
/>
    }} />
  )
}
const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
      marginLeft: 240,
    },
  }
}))

const App = () => {

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Switch>
            <Route path='/login'>
              <Login />
            </Route>
            <Fragment>
              <Navbar />
              <PrivateRoute exact path='/'>
                <div className={classes.content}>
                  <Home />
                </div>
              </PrivateRoute>
              <PrivateRoute path='/profile'>
                <div className={classes.content}>
                  <Profile />
                </div>
              </PrivateRoute>
              <PrivateRoute path='/message'>
                <div className={classes.content}>
                  <Message />
                </div>
              </PrivateRoute>
              <Footer />
            </Fragment>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App