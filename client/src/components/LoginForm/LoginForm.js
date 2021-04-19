import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import User from '../../utils/User'
import { useState } from 'react'
import axios from 'axios'


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginForm = () => {
  const classes = useStyles();
  const [loginState, setLoginState] = useState({
    username: '',
    password: ''
  })

  const handleInputChange = ({ target }) => {
    setLoginState({ ...loginState, [target.name]: target.value })
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    const authObject = { 'Project-ID': '5ae05ac3-2130-4648-8d2d-1d89723a9fa3', 'User-Name': loginState.username, 'User-Secret': loginState.password}
    try {
      await axios.get('https://api.chatengine.io/chats', { headers: authObject })
      localStorage.setItem('username', loginState.username)
      localStorage.setItem('password', loginState.password)

      window.location.reload()
    } catch (error) {

    }


    User.login({
      username: loginState.username,
      password: loginState.password
    })
      .then(({ data }) => {
        localStorage.setItem('user', data)
        window.location = '/'
      })
      .catch(err => console.error(err))
  }

  return (

    <>
    <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
        Sign in
        </Typography>
              <form onSubmit={handleLogin} className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  value={loginState.username}
                  onChange={handleInputChange}
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={loginState.password}
                  onChange={handleInputChange}
                  autoComplete="current-password"
                />
                <Button onClick={handleLogin}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
          Sign In
          </Button>
              </form>
            </div>
      </>

  )
}

export default LoginForm 
    
