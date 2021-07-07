import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import "./Header.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  const spoonInput = useSelector((store) => store.spoonInput);
  const triggerInput = useSelector((store) => store.triggerInput);

  useEffect(() => {
    fetchUserInput();
  }, []);

  const fetchUserInput = () => {
    // Grabbing todays date as YYYY-MM-DD
    const date = new Date().toISOString().substring(0, 10);
    // Fetching the user inputs by date
    dispatch({ type: "FETCH_USER_SPOON", payload: date });
    dispatch({ type: "FETCH_USER_TRIGGER", payload: date });
  };

  const goToGraph = (event) => {
    event.preventDefault();
    history.push("/spoongraph");
  };

  const goToCloud = (event) => {
    event.preventDefault();
    history.push("/wordcloud");
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <h3>Failure Triggers</h3>
            {triggerInput.map((item) => {
              return <li key={item.trigger}>{item.trigger}</li>;
            })}
            <div className="graph-btn">
              <Button variant="contained" onClick={goToCloud}>
                Word Cloud
              </Button>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <h3>Energy</h3>
            <p>{spoonInput.spoon}</p>
            <div className="graph-btn">
              <Button
                className="graph-btn"
                variant="contained"
                onClick={goToGraph}
              >
                Spoon Graph
              </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Header;
