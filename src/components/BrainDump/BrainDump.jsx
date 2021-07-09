import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Masonry from 'react-masonry-css'
// ⬇ What Components we need to import
import Header from "../Header/Header";
import AddNewTask from "../AddNewTask/AddNewTask";
import StickyNote from "../StickyNote/StickyNote";
import CategoryItem from "../CategoryItem/CategoryItem";
// ⬇ What we need from material-ui
import ColorLensIcon from "@material-ui/icons/ColorLens";
import IconButton from "@material-ui/core/IconButton";
import RadioGroup from "@material-ui/core/RadioGroup";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Checkbox from "@material-ui/core/Checkbox";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
}));

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
    color: "#b39ddb",
  },
})((props) => <Radio color="default" {...props} />);

const BrownRadio = withStyles({
  root: {
    color: "#a1887f",
  },
})((props) => <Radio color="default" {...props} />);

const BlueRadio = withStyles({
  root: {
    color: "#90caf9",
  },
})((props) => <Radio color="default" {...props} />);

const DarkPurpleRadio = withStyles({
  root: {
    color: "#9575cd",
  },
})((props) => <Radio color="default" {...props} />);

const GreyRadio = withStyles({
  root: {
    color: "#9e9e9e",
  },
})((props) => <Radio color="default" {...props} />);

function BrainDump() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const task = useSelector((store) => store.task);
  const category = useSelector((store) => store.category);
  const [value, setValue] = useState(10);
  const [open, setOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({});

  const handleClose = () => {
    setOpen(false);
  };

  console.log(category);
  useEffect(() => {
    dispatch({ type: "FETCH_TASK" });
    dispatch({ type: "FETCH_CATEGORY" });
  }, []);

  const handleClick = () => {
    setOpen(true);
  };

  const handleSave = (event) => {
    event.preventDefault();
    console.log(newCategory);
  };

  const breakpoints = {
    default: 7,
    1100: 5,
    1000: 4,
    800: 3,
    600: 2,
    400: 1,
  }
  return (
    <>
      <Header />

      <AddNewTask />
      <div className="container important">
        <h2>SORT HERE(COMING SOON)</h2>
        <RadioGroup
          row
          aria-label="sort-by-category"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        >
          <FormControlLabel
            value="*"
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
            control={<PurpleRadio />}
            label={category[3]?.category}
            labelPlacement="end"
          />
          <FormControlLabel
            value="8"
            control={<DarkPurpleRadio />}
            label={category[4]?.category}
            labelPlacement="end"
          />
          <FormControlLabel
            value="9"
            control={<BrownRadio />}
            label={category[5]?.category}
            labelPlacement="end"
          />
          <FormControlLabel
            value="10"
            control={<GreyRadio />}
            label={category[6]?.category}
            labelPlacement="end"
          />
          <IconButton aria-label="color-pallete-button" onClick={handleClick}>
            <ColorLensIcon fontSize="large" />
          </IconButton>
        </RadioGroup>
      </div>
      <div className={classes.root}>
        <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
          {task.map((item) => {
            return <StickyNote key={item.id} item={item} />;
          })}
        </Masonry>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className="category-dialogue"
      >
        <DialogTitle id="form-dialog-title">Custom Categories (Coming Soon!)</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Customize your category labels below! If you would like to change the category name, click on the checkbox, type your
            category name of choice in the text box and click the save button at the bottom.
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
    </>
  );
}

export default BrainDump;
