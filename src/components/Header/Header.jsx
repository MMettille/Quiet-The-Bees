import { useDispatch, useSelector } from 'react-redux';
import React, {useEffect} from 'react'

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

    const dispatch = useDispatch();
    const userInput = useSelector(store => store.userInput);
    
    useEffect(() => {
        fetchUserInput()
    }, [])

    const fetchUserInput = () => {
        // Grabbing todays date as YYYY-MM-DD
        const date = new Date().toISOString().substring(0, 10);
        console.log(date)
        // Fetching the user inputs by date
        dispatch({ type: 'FETCH_USER_SPOON', payload: date})
        // dispatch({ type: 'FETCH_USER_TRIGGER', payload: date})
    }

    const classes = useStyles();

    return (
        <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <h3>Failure Triggers</h3>
             {/* something.map(somethingTwo => {
                return list for each trigger
            })
             */}
            <Button variant="contained">Word Cloud</Button>
        </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <h3>Energy</h3>
             {/* something.map(somethingTwo => {
                return spoon for each number
            })
             */}
            <Button variant="contained">Graph</Button>
        </Paper>
          </Grid>
        </Grid>
        </div>
  );
}

export default Header;


