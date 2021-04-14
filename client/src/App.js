import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Message from './pages/Message'
const App = () => {
  return (
    <Router>
      <div>
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
      </div>
    </Router>
  )
}

export default App;
