import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Divider } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.primary.text,
  },
}))

const Home = () => {
  const classes = useStyles();
  return (
    <Grid container 
      spacing={1} 
      // alignItems='center'
      // direction="column"
      justify="center"
      xs={12}
    >
      <Grid item xs={10}>
        <Paper className={classes.paper} elevation={1}>
          <Typography variant="h4" gutterBottom>
            New Post
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Share your latest news
          </Typography>

        </Paper>
      </Grid>
      <Grid item xs={10}>
        <Typography variant="h4" gutterBottom>
          Feed:
        </Typography>
        <Divider />
      </Grid>
      <Grid item xs={10}>
        <Paper className={classes.paper} variant="outlined">xs=10</Paper>
      </Grid>
      <Grid item xs={10}>
        <Paper className={classes.paper} variant="outlined">xs=10</Paper>
      </Grid>
      <Grid item xs={10}>
        <Paper className={classes.paper} variant="outlined">xs=10</Paper>
      </Grid>
    </Grid>
  )
}

export default Home
