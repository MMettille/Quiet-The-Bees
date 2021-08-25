// ⬇ What we need to import for functionality
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// ⬇ What we need from material-ui
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
// ⬇ What Components we need to import
import "./Header.css";
// ⬇ Custom styling for material-ui
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    height: "90%",
    color: theme.palette.text.secondary,
  },
}));

function TriggerDisplay() {
  // ⬇ What functions we need to use in this component
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  // ⬇ Variables we need to declare and use in this component
  const triggerInput = useSelector((store) => store.triggerInput);
  const dayDate = new Date();
  const today = dayDate.getDate();

  // ⬇ On page load, run this function
  useEffect(() => {
    fetchUserInput();
  }, []);

  const fetchUserInput = () => {
    // Grabbing todays date as YYYY-MM-DD
    const date = new Date().toISOString().substring(0, 10);
    // Fetching the user inputs by date
    dispatch({ type: "FETCH_USER_TRIGGER", payload: date });
  };

  // ⬇ Sends the user to the word cloud page
  const goToCloud = (event) => {
    event.preventDefault();
    history.push("/wordcloud");
  };


  return (
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper} alignItems="stretch">
              <h3 onClick={() => history.push("/trigger")}>Failure Triggers</h3>
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
  );
}

export default TriggerDisplay;
