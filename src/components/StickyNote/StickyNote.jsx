import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

// ⬇ What Components we need to import
import './StickyNote.css'
// ⬇ What we need from material ui 
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function StickyNote({item}) {

  // ⬇ Declaring the functions we want to use.
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const taskToEdit = useSelector(store => store.taskToEdit)

  // ⬇ Opens and closes the modal
  const handleClose = () => {
    setOpen(false)
  } 

  // ⬇ Sets which task the user would like to edit and sends that to redux
  const handleEdit = () => {
    console.log('Task to edit:', item)
    dispatch({type: 'TASK_TO_EDIT', payload: item})
    
    setOpen(true);
  }
  
  // ⬇ Dispatches the changes to redux after each change
  const handleChange = (event) => { 
    dispatch({ 
      type: 'EDIT_ONCHANGE', 
      payload: { property: 'taskName', value: event.target.value }
    });
  }

  // ⬇ 
  const handleSubmit = (event) => {
    event.preventDefault();
    // ⬇ PUT REQUEST to /task/:id
    dispatch({type: 'EDIT_TASK', payload: taskToEdit})
    // ⬇ Close the Modal 
    setOpen(false);
  }
  
  const handleDelete = (event) => {
    event.preventDefault();
    console.log(item)
   
    // dispatch({type: 'DELETE_TASK', payload: item})
  }

  const [stickyCheckbox, setStickyCheckbox] = useState(item.isComplete)
  const handleCheck = (item) => {
    
    // dispatch({type: 'DELETE_TASK', payload: item})
    dispatch({type: 'TASK_TO_EDIT', payload: item})
    dispatch({ 
      type: 'EDIT_ONCHANGE', 
      payload: { property: 'isComplete', value: !item.isComplete }
    });
    dispatch({type: 'EDIT_TASK', payload: taskToEdit})
    setStickyCheckbox(true)
  }

  return (
    <>
      <div className="note-box">
          <section className="note-checkbox">
            <Checkbox
            checked={item.isComplete}
            color="default"
            onClick={() => handleCheck(item)}
            inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </section>
          <section className="note-body">
            {item.isComplete ?
              (<p className="strikethrough">{item.taskName}</p>) : (<p>{item.taskName}</p>)
            }
              
          </section>
          <section className="note-btns">
              <button onClick={handleEdit}>
                  Edit
              </button>
          </section>
          <section className="delete-note-btn">
            {item.isComplete ?
              (<button onClick={handleDelete}>
                  Delete
              </button>) : ('')
            }
          </section>
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
      <form onSubmit={handleSubmit}>
        <div className="edit-note-box">
          <section className="note-body">
          <input
            onChange={(event) => handleChange(event)}
            value={taskToEdit.taskName}
          />
          <FormControl component="fieldset">
            <FormLabel component="legend">Priority</FormLabel>
            <RadioGroup
              aria-label="priorityStatus"
              value={taskToEdit.priority} 
              onChange={(event) => dispatch({ 
                type: 'EDIT_ONCHANGE', 
                payload: { property: 'priority', value: event.target.value }
              })}>
                <FormControlLabel value="NOW" control={<Radio />} label="NOW" />
                <FormControlLabel value="soonish" control={<Radio />} label="soon-ish" />
                <FormControlLabel value="later" control={<Radio />} label="later" />
            </RadioGroup>
          </FormControl>
          <input type='submit' value='Update Task'/>
          </section>
        </div>
      </form>
      </Fade>
      </Modal>
    </>
  );
}

export default StickyNote;
