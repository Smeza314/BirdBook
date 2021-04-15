import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Message from './pages/Message'
import Navbar from './components/Navbar'
import stickyFooter from './components/stickyFooter'

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
