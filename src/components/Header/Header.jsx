import TriggerBox from './TriggerBox/TriggerBox';
import SpoonBox from './SpoonBox/SpoonBox'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
}));

function Header() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TriggerBox />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SpoonBox />
          </Grid>
        </Grid>
        </div>
  );
}

export default Header;


