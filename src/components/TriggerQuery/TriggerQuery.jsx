import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import image from "./just_bee_you.png";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogActions from '@material-ui/core/DialogActions';

function TriggerQuery() {
  
  const history = useHistory("");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [userInput, setUserInput] = useState([{ trigger: null }]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
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

        <form >
          {userInput.map((userInput, idx) => {
            return (
              <section  key={`${userInput}-${idx}`}>
                <List>
                  <ListItem className="important">
                    <TextField
                      type="text"
                      variant="outlined"
                      label="Enter Trigger Here"
                      value={userInput.trigger || ""}
                      onChange={(e) => handleChange(idx, e)}
                    />
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

      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText>
            <p>Think of a failure trigger as anything that can prevent you from being productive that day. Some common failure triggers (this will vary based on YOU):</p>
            <ul>
              <li>Didn't get enough sleep last night</li>
              <li>Sensitive to noise</li>
              <li>Food (either you are hungry or food is triggering in general)</li>
              <li>Feeling anxious - I encourage you to dive deeper with this. About what?</li>
              <li>Multitasking</li>
              <li>Tiny humans//dogs//cats//partner wants attention</li>
              <li>Recent fight//breakup//life-event that is on your mind</li>
              <li>Feeling Overwhelmed</li>
              <li>Depression</li>
              <li>LOTS of things to do today, not enough time</li>
            </ul>
            <p>Failure triggers are nothing to be ashamed of - but it is important to keep track of the ones that you have most so you can work
              WITH them, instead of against them.
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TriggerQuery;
