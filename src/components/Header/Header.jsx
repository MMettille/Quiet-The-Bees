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
import image from "../Images/spoon.png";
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

function Header() {
  // ⬇ What functions we need to use in this component
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  // ⬇ Variables we need to declare and use in this component
  const spoonInput = useSelector((store) => store.spoonInput);
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
    dispatch({ type: "FETCH_USER_SPOON", payload: date });
    dispatch({ type: "FETCH_USER_TRIGGER", payload: date });
  };

  // ⬇ Sends the user to the spoon graph page
  const goToGraph = (event) => {
    event.preventDefault();
    history.push("/spoongraph");
  };

  // ⬇ Sends the user to the word cloud page
  const goToCloud = (event) => {
    event.preventDefault();
    history.push("/wordcloud");
  };

  // ⬇ Prints the spoons to the header section
  const printSpoons = () => {
    let rows = [];
    for (let i = 0; i < spoonInput.spoon; i++) {
      rows.push(
        <img
          src={image}
          alt="Image of a Spoon"
          className="spoon-image"
          key={i}
        />
      );
    }
    return rows;
  };

  // ⬇ Prints the days of the week to the top of the page and puts a circle around today
  const printWeekdays = () => {
    const array = [];
    const WeekDay = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let now = WeekDay[dayDate.getDay()];
    for (let item of WeekDay) {
      if (now === item) {
        array.push(<p className={`now now-circle`}>{item}</p>);
      } else if (now != item) {
        array.push(<p className={`now`}>{item}</p>);
      }
    }
    return array;
  };
  // ⬇ Prints the numbers 1-31 to the top of the page and puts a circle around today
  const printDays = () => {
    const Days = [];
    for (let i = 1; i <= 31; i++) {
      if (today === i) {
        Days.push(<p className={`day day-circle`}>{i}</p>);
      } else if (today != i) {
        Days.push(<p className={`day`}>{i}</p>);
      }
    }
    return Days;
  };

  return (
    <div className="container">
      {printWeekdays()}
      <br />
      {printDays()}
      <div className={classes.root}>
        <Grid
          spacing={3}
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
        >
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper} alignItems="stretch">
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
            <Paper className={classes.paper} alignItems="stretch">
              <h3>Spoon(s)</h3>
              <div className="minimum-height-trigger-box">{printSpoons()}</div>
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
    </div>
  );
}

export default Header;
