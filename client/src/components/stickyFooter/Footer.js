import "../../Footer.css";
import CopyrightIcon from '@material-ui/icons/Copyright';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  title: {
    textDecoration: 'none',
    color: theme.palette.secondary.main,
    marginTop: 2,
  }
}))

const Footer = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <footer className="footer">
        <Typography variant='body1' className={classes.title}>
          <CopyrightIcon style={{ fontSize: 12 }} /> BirdBook
        </Typography>
      </footer>
    </div>
  )
} 

export default Footer