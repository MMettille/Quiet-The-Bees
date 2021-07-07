import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";

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

function AddNewTask() {
  const dispatch = useDispatch();

  const [newTask, setNewTask] = useState('');
  const [value, setValue] = useState('');
  const category = useSelector (store => store.category)

  useEffect(() => {
    dispatch({ type: "FETCH_CATEGORY" });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({
      type: "ADD_NEW_TASK",
      payload: {
        taskName: newTask,
        priority: value,
      },
    });
    setNewTask('');
    setValue('');
  };

  return (
    <>
      <div className="add-box">
        <h1>Create Your Reminder Here!</h1>
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
              <h3>Add A Category Here:</h3>
              <RadioGroup
                row
                aria-label="priorityStatus"
                value={value}
                onChange={(event) => setValue(event.target.value)}
              >
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
                  control={<PurpleRadio />}
                  label={category[3]?.category}
                  labelPlacement="top"
                />
                <FormControlLabel
                  value="8"
                  control={<DarkPurpleRadio />}
                  label={category[4]?.category}
                  labelPlacement="top"
                />
                <FormControlLabel
                  value="9"
                  control={<BrownRadio />}
                  label={category[5]?.category}
                  labelPlacement="top"
                />
                <FormControlLabel
                  value="10"
                  control={<GreyRadio />}
                  label={category[6]?.category}
                  labelPlacement="top"
                />
              </RadioGroup>
            </FormControl>
          </section>
          <section className="add-btn">
            <Button variant="outlined" type="submit">
              Add Note
            </Button>
          </section>
        </form>
      </div>
    </>
  );
}

export default AddNewTask;
