// ⬇ What we need to import for functionality
import React from "react";
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
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    height: "90%",
    color: theme.palette.text.secondary,
  },
}));

function Header({spoonInput}) {
  // ⬇ What functions we need to use in this component
  const history = useHistory();
  const classes = useStyles();

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
        <h3 className="title">Failure Triggers</h3>
              <h5 className="less-margin">Click <span className="bold pointer less-margin" onClick={() => history.push("/spoon")}>here </span>
                to record the number of spoons you have today.
               </h5>
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
