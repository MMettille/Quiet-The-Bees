import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import "./Header.css";
import image from './spoon.png'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    height: '90%',
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

  const printSpoons = () => {
    let rows = [];
    for (let i=0; i<spoonInput.spoon; i++){
      rows.push(<img src={image} alt="Image of a Spoon" className="spoon-image" key={i}/>)
    }
    return rows
  }
  return (
    <div className={classes.root}>
      <Grid
        spacing={3}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
      >
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper} alignItems="stretch" >
            <h3>Failure Triggers</h3>
            <div className="minimum-height-trigger-box">
            {triggerInput.map((item) => {
              return <p key={item.trigger}>{item.trigger}</p>;
            })}
            </div>
            
            <div className="graph-btn">
              <Button variant="contained" onClick={goToCloud}>
                Word Cloud
              </Button>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper} alignItems="stretch" >
            <h3>Spoon(s)</h3>
            {printSpoons()}
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
