import { useDispatch, useSelector } from 'react-redux';
import React, {useEffect, useState} from 'react'
import { withStyles } from '@material-ui/core/styles';

import './AddNewTask.css'

import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';

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
                <h1>Create Your Reminder Here!</h1>
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
                            <h3>When Does It Need to Happen?</h3>
                                <RadioGroup row aria-label="priorityStatus" value={value} onChange={(event) => setValue(event.target.value)}>
                                    <FormControlLabel value="1" control={<RedRadio />} label="NOW" labelPlacement="top"/>
                                    <FormControlLabel value="2" control={<OrangeRadio />} label="Soon-ish" labelPlacement="top"/>
                                    <FormControlLabel value="3" control={<YellowRadio />} label="Later" labelPlacement="top"/>
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


