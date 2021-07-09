import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";

import "./AddNewTask.css";

import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";

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

function AddNewTask() {
  const dispatch = useDispatch();
  const location = useLocation();

  const currentLocation = location.pathname;
  const [newTask, setNewTask] = useState("");
  const [value, setValue] = useState("");
  const category = useSelector((store) => store.category);

  useEffect(() => {
    dispatch({ type: "FETCH_CATEGORY" });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if(value === ''){
      setValue = 10
    }
    dispatch({
      type: "ADD_NEW_TASK",
      payload: {
        taskName: newTask,
        color_id: value,
      },
    });
    setNewTask("");
    setValue("");
  };

  return (
    <>
      {currentLocation.includes("/main") ? (
        <div className="main-add-box">
          <h4>What Do You Need to Do Today?</h4>
          <form onSubmit={handleSubmit}>
            <section className="add-body">
              <TextField
                type="text"
                multiline
                variant="outlined"
                label="Enter Task Here"
                value={newTask}
                onChange={(event) => setNewTask(event.target.value)}
              />
            </section>

            <section className="note-radio-group">
              <FormControl component="fieldset">
                <h4>When Do You Have to Do It?</h4>
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
                  </section>
                </RadioGroup>
              </FormControl>
            </section>
            <section className="add-btn">
              <Button variant="outlined" size="small" type="submit">
                Add Note
              </Button>
            </section>
          </form>
        </div>
      ) : currentLocation.includes("/braindump") ? (
        <div className="braindump-add-box">
          <h4>What Do You Need Out of Your Head?</h4>
          <form onSubmit={handleSubmit}>
            <section className="add-body">
              <TextField
                type="text"
                multiline
                variant="outlined"
                label="Enter Task Here"
                value={newTask}
                onChange={(event) => setNewTask(event.target.value)}
              />
            </section>

            <section className="note-radio-group">
              <FormControl component="fieldset">
                <h4>Do you want to add a category?</h4>
                <RadioGroup
                  row
                  aria-label="priorityStatus"
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                >
                  <section>
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
            </section>
            <section className="add-btn">
              <Button variant="outlined" size="small" type="submit">
                Add Note
              </Button>
            </section>
          </form>
        </div>
      ) : null}
    </>
  );
}

export default AddNewTask;
