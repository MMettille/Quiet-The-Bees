// ⬇ What we need to import for functionality
import React, { useState } from "react";
// ⬇ What we need from material-ui
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import clsx from "clsx";
import { green } from "@material-ui/core/colors";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogActions from '@material-ui/core/DialogActions';
import Button from "@material-ui/core/Button";

import AddNewTask from "../AddNewTask/AddNewTask";
// ⬇ Custom styling for material-ui
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(3),
    right: theme.spacing(3),
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
  // ⬇ Variables we need to declare and use in this component
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const fabs = {
    color: "inherit",
    className: clsx(classes.fab, classes.fabGreen),
    icon: <AddIcon />,
    label: "Expand",
  };

  // ⬇ Function to close the dialog
  const handleClose = () => {
    setOpen(false);
  };
  // ⬇ Function to open the dialog
  const handleClick = (event) => {
    event.preventDefault();
    setOpen(true);
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
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogContent dividers={scroll === "paper"}>
          <AddNewTask />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Footer;
