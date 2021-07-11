// ⬇ What we need to import for functionality
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// ⬇ What we need from material-ui
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import clsx from "clsx";
import { green } from "@material-ui/core/colors";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import image from "../Images/bee_path_7.png";
import imageTwo from "../Images/Bee_3.png";

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

// ⬇ The custom Radio Color Buttons
const RedRadio = withStyles({
  root: {
    color: "#e53935",
  },
})((props) => <Radio color="default" {...props} />);

const OrangeRadio = withStyles({
  root: {
    color: "#f57c00",
  },
})((props) => <Radio color="default" {...props} />);

const YellowRadio = withStyles({
  root: {
    color: "#fdd835",
  },
})((props) => <Radio color="default" {...props} />);

const GreenRadio = withStyles({
  root: {
    color: "#80cbc4",
  },
})((props) => <Radio color="default" {...props} />);

const LightGreenRadio = withStyles({
  root: {
    color: "#aed581",
  },
})((props) => <Radio color="default" {...props} />);

const PurpleRadio = withStyles({
  root: {
    color: "#7e57c2",
  },
})((props) => <Radio color="default" {...props} />);

const TealRadio = withStyles({
  root: {
    color: "#009688",
  },
})((props) => <Radio color="default" {...props} />);

const BlueRadio = withStyles({
  root: {
    color: "#90caf9",
  },
})((props) => <Radio color="default" {...props} />);

const DarkBlueRadio = withStyles({
  root: {
    color: "#03a9f4",
  },
})((props) => <Radio color="default" {...props} />);

const GreyRadio = withStyles({
  root: {
    color: "#9e9e9e",
  },
})((props) => <Radio color="default" {...props} />);

function FabBtn() {
  // ⬇ Variables we need to declare and use in this component
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const fabs = {
    color: "inherit",
    className: clsx(classes.fab, classes.fabGreen),
    icon: <AddIcon />,
    label: "Expand",
  };

  // ⬇ What functions we need to use in this component
  const dispatch = useDispatch();
  const location = useLocation();
  // ⬇ Variables we need to declare and use in this component
  const category = useSelector((store) => store.category);
  const [newTask, setNewTask] = useState("");
  const [value, setValue] = useState(10);
  const currentLocation = location.pathname;
  // ⬇ On page load, fetch the categories from the database
  useEffect(() => {
    dispatch({ type: "FETCH_CATEGORY" });
  }, []);

  const handleSubmit = (event) => {
    // ⬇ Prevent the page from reloading
    event.preventDefault();
    // ⬇ Dispatch the new task to redux
    dispatch({
      type: "ADD_NEW_TASK",
      payload: {
        taskName: newTask,
        color_id: value,
      },
    });
    // ⬇ Reset the newTask to an empty string and the value to 10
    setNewTask("");
    setValue(10);
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
      
      <Dialog open={open} onClose={handleClose}>
        <DialogContent dividers={scroll === "paper"}>
        <img className="beeThree" src={image} /> 
          <div className="workspoon-add-box">
            <h5>What Do You Need Out of Your Head?</h5>
            <form onSubmit={handleSubmit}>
              <section className="add-body">
                <TextField
                  type="text"
                  size="small"
                  multiline
                  variant="outlined"
                  label="Enter Task Here"
                  value={newTask}
                  onChange={(event) => setNewTask(event.target.value)}
                />
              </section>

              <FormControl component="fieldset">
                <h5>Do you want to add a category?</h5>
                <RadioGroup
                  row
                  aria-label="priorityStatus"
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                >
                  <section>
                    <FormControlLabel
                      value="1"
                      control={<RedRadio />}
                      label="NOW"
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      value="2"
                      control={<OrangeRadio />}
                      label="Soon-ish"
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      value="3"
                      control={<YellowRadio />}
                      label="Later"
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      value="4"
                      control={<LightGreenRadio />}
                      label={category[0]?.category}
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      value="5"
                      control={<GreenRadio />}
                      label={category[1]?.category}
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      value="6"
                      control={<BlueRadio />}
                      label={category[2]?.category}
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      value="7"
                      control={<DarkBlueRadio />}
                      label={category[3]?.category}
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      value="8"
                      control={<PurpleRadio />}
                      label={category[4]?.category}
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      value="9"
                      control={<TealRadio />}
                      label={category[5]?.category}
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      value="10"
                      control={<GreyRadio />}
                      label="Blank"
                      labelPlacement="top"
                    />
                  </section>
                </RadioGroup>
              </FormControl>

              <section className="add-btn">
                <Button variant="outlined" size="small" type="submit">
                  Add Note
                </Button>
              </section>
            </form>
          </div>
          <img className="bzz" src={imageTwo} />
           
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FabBtn;
