import { useDispatch, useSelector } from 'react-redux';
import React, {useEffect, useState} from 'react'
import { withStyles } from '@material-ui/core/styles';

import './AddNewTask.css'

import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';

const RedRadio = withStyles({
    root: {
      color: "#e53935",
      '&$checked': {
        color: "#c62828",
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

const OrangeRadio = withStyles({
    root: {
      color: "#ff9800",
      '&$checked': {
        color: "#f57c00",
      },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

const YellowRadio = withStyles({
    root: {
      color: "#ffeb3b",
      '&$checked': {
        color: "#ffeb3b",
      },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

const GreenRadio = withStyles({
    root: {
      color: "#80cbc4",
      '&$checked': {
        color: "#009688",
      },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

const PurpleRadio = withStyles({
    root: {
      color: "#b39ddb",
      '&$checked': {
        color: "#7e57c2",
      },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

const BrownRadio = withStyles({
    root: {
      color: "#bcaaa4",
      '&$checked': {
        color: "#8d6e63",
      },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

const BlueRadio = withStyles({
    root: {
      color: "#90caf9",
      '&$checked': {
        color: "#42a5f5",
      },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);


function AddNewTask() {

    const dispatch = useDispatch();
    
    const [newTask, setNewTask] = useState('');
    const [value, setValue] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: 'ADD_NEW_TASK',
            payload: {
                taskName: newTask,
                priority: value
            }});
        setNewTask('');
        setValue('');
    }

    return (
        <>
            <div className="add-box">
                <form onSubmit={handleSubmit}>
                    <section className="add-body">
                        <TextField
                        type="text"
                        multiline
                        variant="outlined"
                        label="Enter Task Here"
                        onChange={(event) => setNewTask(event.target.value )}
                        />
                    </section>
                    
                    <section className="note-radio-group">
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Priority</FormLabel>
                                <RadioGroup row aria-label="priorityStatus" value={value} onChange={(event) => setValue(event.target.value)}>
                                    <FormControlLabel value="NOW" control={<RedRadio />} label="NOW" labelPlacement="top"/>
                                    <FormControlLabel value="soonish" control={<OrangeRadio />} label="soon-ish" labelPlacement="top"/>
                                    <FormControlLabel value="later" control={<YellowRadio />} label="later" labelPlacement="top"/>
                                    <FormControlLabel value="something" control={<GreenRadio />} label="something" labelPlacement="top"/>
                                    <FormControlLabel value="something2" control={<PurpleRadio />} label="something2" labelPlacement="top"/>
                                    <FormControlLabel value="something3" control={<BlueRadio />} label="something3" labelPlacement="top"/>
                                    <FormControlLabel value="something4" control={<BrownRadio />} label="something4" labelPlacement="top"/>
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


