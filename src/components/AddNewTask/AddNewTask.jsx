import { useDispatch, useSelector } from 'react-redux';
import React, {useEffect, useState} from 'react'


import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


function AddNewTask() {

    const [newTask, setNewTask] = useState('');
    const [value, setValue] = useState('')


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('clicked -> new task is: ', newTask)
        setNewTask({...newTask, priority: value})
        console.log(newTask)
        // dispatch({type: 'ADD_NEW_TASK', payload: newTask})
        // setNewTask({})
        console.log(value)
    }

    return (
        <>
            <div className="note-box">
                <form onSubmit={handleSubmit}>
                    <section className="note-body">
                        <input
                        type="text"
                        placeholder="Enter Task Here"
                        onChange={(event) => setNewTask(event.target.value )}
                        />
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Priority</FormLabel>
                                <RadioGroup aria-label="priorityStatus" value={value} onChange={(event) => setValue(event.target.value)}>
                                    <FormControlLabel value="NOW" control={<Radio />} label="NOW" />
                                    <FormControlLabel value="soonish" control={<Radio />} label="soon-ish" />
                                    <FormControlLabel value="later" control={<Radio />} label="later" />
                                </RadioGroup>
                        </FormControl>
                    </section>
                        
                    <section className="note-btns">
                    <Button type="submit">
                        Add Note
                    </Button>
                    </section>
                </form>
            </div>
        </>
  );
}

export default AddNewTask;


