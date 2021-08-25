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
  };

  // ⬇ Sends the user to the spoon graph page
  const goToGraph = (event) => {
    event.preventDefault();
    history.push("/spoongraph");
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

  return (
    <Grid item xs={12} sm={6}>
      <Paper className={classes.paper} alignItems="stretch">
        <h3>Spoon(s)</h3>
        <div className="minimum-height-trigger-box">{printSpoons()}</div>
        <div className="graph-btn">
          <Button className="graph-btn" variant="contained" onClick={goToGraph}>
            Spoon Graph
          </Button>
        </div>
      </Paper>
    </Grid>
  );
}

export default Header;
