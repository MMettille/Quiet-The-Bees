import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
}));

function TriggerBox() {
    // Grabbing todays date as YYYY-MM-DD
    const d = new Date();
    console.log(d)
    const date = d.toISOString().substring(0, 10);
    console.log(date)
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <h3>Failure Triggers</h3>
            <ul>
                <li>One</li>
                <li>Two</li>
                <li>Three</li>
            </ul>
            <Button variant="contained">Word Cloud</Button>
        </Paper>
  );
}

export default TriggerBox;