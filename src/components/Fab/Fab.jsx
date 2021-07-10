// ⬇ What we need to import for functionality
import React from "react";
// ⬇ What we need from material-ui
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import clsx from "clsx";
import { green } from "@material-ui/core/colors";
// ⬇ Custom styling for material-ui
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[600],
    },
  },
}));

function Footer() {
  const classes = useStyles();
  const fabs = {
    color: "inherit",
    className: clsx(classes.fab, classes.fabGreen),
    icon: <AddIcon />,
    label: "Expand",
  };

  const handleClick = (event) => {
    event.preventDefault();
    console.log("clicked");
  };

  return (
    <>
      <div className={classes.root}>
        <Fab
          aria-label={fabs.label}
          className={fabs.className}
          color={fabs.color}
          onClick={handleClick}
        >
          {fabs.icon}
        </Fab>
      </div>
    </>
  );
}

export default Footer;
