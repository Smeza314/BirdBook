import "../../Footer.css";
import CopyrightIcon from '@material-ui/icons/Copyright';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    textDecoration: 'none',
    color: theme.palette.secondary.main,
    marginTop: 6,
  },
  foot: {
    zIndex: theme.zIndex.drawer + 1,
  }
}))

const Footer = () => {
  const classes = useStyles()

  return (
    <AppBar className={classes.foot}>
      <footer className="footer">
        <Typography variant='body1' className={classes.title}>
          <CopyrightIcon style={{ fontSize: 12 }} /> BirdBook
        </Typography>
      </footer>
    </AppBar>
  )
} 

export default Footer