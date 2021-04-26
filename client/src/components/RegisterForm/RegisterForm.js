import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react'
import User from '../../utils/User'
import axios from 'axios';



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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const RegisterForm = () => {
  const classes = useStyles();
  const [loginState, setLoginState] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
  })

  const handleInputChange = ({ target }) => {
    setLoginState({ ...loginState, [target.name]: target.value })
  }

  const handleRegister = event => {
    event.preventDefault()

    User.register({
      name: loginState.name,
      email: loginState.email,
      username: loginState.username,
      password: loginState.password
    })
      .then(() => {
        axios.post('https://api.chatengine.io/users/', {
          username: loginState.username,
          secret: loginState.password
        }, {
          headers: {
            'PRIVATE-KEY': '8816c2ea-a6c0-43fc-8d56-602fc5f8e515'
          }
        })
          .then(() => {
            alert('User registered!')
            setLoginState({ ...loginState, name: '', email: '', username: '', password: '' })
          })
          .catch(err => { 
            console.error(err)
            axios.post('https://api.chatengine.io/users', {
              username: loginState.username,
              secret: loginState.password
            }, {
              headers: {
                'PRIVATE-KEY': '8816c2ea-a6c0-43fc-8d56-602fc5f8e515'
              }
            })
              .then(() => {
                alert('User registered!')
                setLoginState({ ...loginState, name: '', email: '', username: '', password: '' })
              })
              .catch(err => console.error(err))
          })
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
          Sign up
        </Typography>
        <form onSubmit={handleRegister} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined" npm
                required
                fullWidth
                id="name"
                label="name"
                value={loginState.name}
                onChange={handleInputChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                value={loginState.username}
                onChange={handleInputChange}
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={loginState.email}
                onChange={handleInputChange}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
            </Grid>
          </Grid>
          <Button onClick={handleRegister}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
      </div>

    </>

  )
}

export default RegisterForm