// ⬇ What we need to import for functionality
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// ⬇ What Components we need to import
import "./StickyNote.css";
import image from "../Images/bee_path_7.png";
import imageTwo from "../Images/Bee_3.png";
// ⬇ What we need from material ui
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { useLocation } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
// ⬇ Custom styling for material-ui
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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

function StickyNote({ item }) {
  // ⬇ What functions we need to use in this component
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  // ⬇ Variables we need to declare and use in this component
  const taskToEdit = useSelector((store) => store.taskToEdit);
  const category = useSelector((store) => store.category);
  const [open, setOpen] = useState(false);
  const currentLocation = location.pathname;
  const [isShown, setIsShown] = useState(false);

  // ⬇ Opens and closes the Dialog
  const handleClose = () => {
    setOpen(false);
  };

  // ⬇ On page load, fetch the categories from the database
  useEffect(() => {
    dispatch({ type: "FETCH_CATEGORY" });
  }, []);

  // ⬇ Sets which task the user would like to edit and sends that to redux
  const handleEdit = () => {
    console.log("Task to edit:", item);
    dispatch({ type: "TASK_TO_EDIT", payload: item });
    setOpen(true);
  };

  // ⬇ Dispatches the changes to redux after each change
  const handleChange = (event) => {
    dispatch({
      type: "EDIT_ONCHANGE",
      payload: { property: "taskName", value: event.target.value },
    });
  };

  // ⬇ Send the changes to redux saga and to the database
  const handleSubmit = (event) => {
    event.preventDefault();
    // ⬇ PUT REQUEST to /task/:id
    dispatch({ type: "EDIT_TASK", payload: taskToEdit });
    // ⬇ Close the Dialog
    setOpen(false);
  };

  // ⬇ Selects the task, sends that to redux, changes the isComplete status,
  // and sends that to redux saga and to the database
  const handleCheck = (item) => {
    dispatch({ type: "TASK_TO_EDIT", payload: item });
    dispatch({
      type: "EDIT_ONCHANGE",
      payload: { property: "isComplete", value: !item.isComplete },
    });
    dispatch({ type: "EDIT_TASK", payload: taskToEdit });
  };

  // ⬇ Send the to-be-deleted task to the redux saga and to the database for deletion
  const handleDelete = (event) => {
    event.preventDefault();
    dispatch({ type: "DELETE_TASK", payload: item });
  };

  return (
    <>
      <div
        className={`note-box ${item.color_name}`}
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        <section className="note-checkbox">
          <Checkbox
            checked={item.isComplete}
            color="default"
            onChange={() => handleCheck(item)}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </section>
        <section className="note-body">
          {item.isComplete ? (
            <p className="strikethrough font-size">{item.taskName}</p>
          ) : (
            <p className="font-size">{item.taskName}</p>
          )}
        </section>
        <section className="note-btns"></section>
        <section className="delete-note-btn">
          {isShown && (
            <>
              {item.isComplete ? (
                ""
              ) : (
                <IconButton
                  size="small"
                  variant="outlined"
                  onClick={handleEdit}
                >
                  <EditIcon />
                </IconButton>
              )}

              {item.isComplete ? (
                <IconButton
                  onClick={handleDelete}
                  size="small"
                  variant="outlined"
                  className="btn"
                >
                  <DeleteIcon />
                </IconButton>
              ) : (
                ""
              )}
            </>
          )}
        </section>
      </div>

      <Dialog
        aria-labelledby="edit-dialog"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        
      >
        
        <img className="beeThree" src={image} /> 
        <DialogContent />
          <div className="workspoon-add-box">
            <h2>Update Task Here</h2>
            <form onSubmit={handleSubmit}>
              <section className="note-body">
                <TextField
                  type="text"
                  multiline
                  variant="outlined"
                  value={taskToEdit.taskName}
                  onChange={(event) => handleChange(event)}
                />
              </section>
              <section className="note-radio-group">
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="priorityStatus"
                    row
                    value={taskToEdit.color_id}
                    onChange={(event) =>
                      dispatch({
                        type: "EDIT_ONCHANGE",
                        payload: {
                          property: "color_id",
                          value: event.target.value,
                        },
                      })
                    }
                  >
                    {currentLocation.includes("/braindump") ? (
                      <>
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
                      </>
                    ) : currentLocation.includes("/main") ? (
                      <>
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
                          value="10"
                          control={<GreyRadio />}
                          label={category[6]?.category}
                          labelPlacement="top"
                        />
                      </>
                    ) : null}
                  </RadioGroup>
                </FormControl>
              </section>
              <section className="add-btn">
                <Button variant="outlined" type="submit" size="small">
                  Update Note
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

export default StickyNote;
