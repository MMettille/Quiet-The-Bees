// ⬇ What we need to import for functionality
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Masonry from "react-masonry-css";
// ⬇ What Components we need to import
import Header from "../Header/Header";
import AddNewTask from "../AddNewTask/AddNewTask";
import StickyNote from "../StickyNote/StickyNote";
import CategoryItem from "../CategoryItem/CategoryItem";
import Fab from "../Fab/Fab";
// ⬇ What we need from material-ui
import ColorLensIcon from "@material-ui/icons/ColorLens";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import RadioGroup from "@material-ui/core/RadioGroup";
// ⬇ Custom styling for material-ui
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  radioGroup: {
    width: '95%',
    margin: 'auto'
  }
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

function BrainDump() {
  // ⬇ What functions we need to use in this component
  const dispatch = useDispatch();
  const classes = useStyles();
  // ⬇ Variables we need to declare and use in this component
  const task = useSelector((store) => store.task);
  const category = useSelector((store) => store.category);
  const [open, setOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({});
  const [value, setValue] = useState(0);

  // ⬇ On page load, fetch the task and categories from the database
  useEffect(() => {
    dispatch({ type: "FETCH_CATEGORY" });
  }, []);

  // ⬇ Function to close the dialog
  const handleClose = () => {
    setOpen(false);
  };
  // ⬇ Function to open the dialog
  const handleClick = () => {
    setOpen(true);
  };

  // ⬇ Breakpoints for masonry css
  const breakpoints = {
    default: 8,
    1250: 7,
    1100: 6,
    1000: 5,
    800: 4,
    600: 3,
    450: 2,
    320: 1,
  };

  useEffect(() => {
    dispatch({ type: "FETCH_TASK_BY_CATEGORY", payload: value });
  }, [value]);

  return (
    <>
      <Header />

      <AddNewTask />
      <RadioGroup
        defaultValue="0"
        row
        aria-label="sort-by-category"
        onChange={(event) => setValue(event.target.value)}
        className={classes.radioGroup}
      >
        <FormControlLabel
          value="0"
          control={<Radio color="default" />}
          label="ALL"
          labelPlacement="end"
        />
        <FormControlLabel
          value="4"
          control={<LightGreenRadio />}
          label={category[0]?.category}
          labelPlacement="end"
        />
        <FormControlLabel
          value="5"
          control={<GreenRadio />}
          label={category[1]?.category}
          labelPlacement="end"
        />
        <FormControlLabel
          value="6"
          control={<BlueRadio />}
          label={category[2]?.category}
          labelPlacement="end"
        />
        <FormControlLabel
          value="7"
          control={<DarkBlueRadio />}
          label={category[3]?.category}
          labelPlacement="end"
        />
        <FormControlLabel
          value="8"
          control={<PurpleRadio />}
          label={category[4]?.category}
          labelPlacement="end"
        />
        <FormControlLabel
          value="9"
          control={<TealRadio />}
          label={category[5]?.category}
          labelPlacement="end"
        />
        <FormControlLabel
          value="10"
          control={<GreyRadio />}
          label="Blank"
          labelPlacement="end"
        />
        <IconButton aria-label="color-pallete-button" onClick={handleClick}>
          <ColorLensIcon fontSize="large" />
        </IconButton>
      </RadioGroup>   
      <div className={classes.root}>
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {task.map((item) => {
            if (item.color_id > 3) {
              return <StickyNote key={item.id} item={item} />;
            }
          })}
        </Masonry>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className="category-dialogue"
      >
        <DialogTitle id="form-dialog-title">Custom Categories</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Customize your category labels below! If you would like to change
            the category name, click on the edit button, type in your category
            name of choice in the text box and click the save button.
          </DialogContentText>
          <List>
            {category?.map((item) => {
              return <CategoryItem key={item.id} category={item} />;
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Fab />
    </>
  );
}

export default BrainDump;