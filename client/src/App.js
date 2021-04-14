import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Message from './pages/Message'
import Navbar from './components/Navbar'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffff81',
      main: '#ffd54f',
      dark: '#c8a415',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
})

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Navbar>
          <div>
            <Link to='/'>home</Link>
            <Link to='/login'>login</Link>
            <Link to='/profile'>profile</Link>
            <Link to='/message'>messages</Link>
          </div>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/profile'>
              <Profile />
            </Route>
            <Route path='/message'>
              <Message />
            </Route>
          </Switch>
          </Navbar>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App;
