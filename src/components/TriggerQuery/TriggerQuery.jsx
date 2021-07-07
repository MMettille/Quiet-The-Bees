import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import image from "./just_bee_you.png";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    textAlign: 'left',
    paddingTop: 8,
    paddingBottom: 8,
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    textDecoration: 'none',
    width: '100%',
  }
}));

function TriggerQuery() {
  
  const history = useHistory("");
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [userInput, setUserInput] = useState([{ trigger: null }]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSave = (event) => {
    event.preventDefault();
    console.log(`The user's input(s) are: `, userInput);
  };

  const handleAdd = () => {
    const trigger = [...userInput];
    trigger.push({ trigger: null });
    setUserInput(trigger);
  };

  const handleChange = (i, event) => {
    const trigger = [...userInput];
    trigger[i].trigger = event.target.value;
    setUserInput(trigger);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`User's Trigger Input is: `, userInput);
    dispatch({ type: "ADD_TRIGGER_INPUT", payload: userInput });
    // ⬇ Resets the value to 0
    setUserInput([{ trigger: null }]);
    // ⬇ Will send user to a new page
    history.push("/main");
  };

  return (
    <>
      <div className="container">
        <img src={image} width="50%" />
        <h1>Any Failure Triggers to Be Aware Of?</h1>
        <Button onClick={handleOpen} variant="outlined">
          Interested in Learning More About Failure Triggers?
        </Button>

        <form onSubmit={handleSave}>
          {userInput.map((userInput, idx) => {
            return (
              <section  key={`${userInput}-${idx}`}>
                <List>
                  <ListItem className="important">
                    <TextField
                      type="text"
                      variant="outlined"
                      label="Enter text"
                      value={userInput.trigger || ""}
                      onChange={(e) => handleChange(idx, e)}
                    />
                    <Button type="submit" variant="outlined">
                      Save
                    </Button>
                  </ListItem>
                </List>
              </section>
            );
          })}
        </form>

        <IconButton variant="outlined" onClick={() => handleAdd()}>
          <AddCircleOutlineIcon />
        </IconButton>
        <Button type="button" variant="outlined" onClick={handleSubmit}>
          Submit
        </Button>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="visually_embed">
            <p>Some Text Here</p>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

export default TriggerQuery;
