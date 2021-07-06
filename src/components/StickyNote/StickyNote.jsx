import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

// ⬇ What Components we need to import
import './StickyNote.css'
// ⬇ What we need from material ui 
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Dialog from '@material-ui/core/Dialog';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
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
}));
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

function StickyNote({item}) {

  // ⬇ Declaring the functions we want to use.
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
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
    dispatch({type: 'DELETE_TASK', payload: item})
  }

  const handleCheck = (item) => {
    dispatch({type: 'TASK_TO_EDIT', payload: item})
    dispatch({ 
      type: 'EDIT_ONCHANGE', 
      payload: { property: 'isComplete', value: !item.isComplete }
    });
    dispatch({type: 'EDIT_TASK', payload: taskToEdit})
    
  }

  return (
    <>
    <Grid item>
      <div className={`note-box ${item.color_name}`}>
          <section className="note-checkbox">
            <Checkbox
            checked={item.isComplete}
            color="default"
            onChange={() => handleCheck(item)}
            inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </section>
          <section className="note-body">
            {item.isComplete ?
              (<p className="strikethrough font-size">{item.taskName}</p>) : (<p className="font-size">{item.taskName}</p>)
            }
          </section>
          <section className="note-btns">
              
          </section>
          <section className="delete-note-btn">
            {item.isComplete ?
              (<button onClick={handleDelete}>
                Delete
              </button>) : (
                <button onClick={handleEdit}>
                Edit
                </button>
              )
            }
          </section>
      </div>
    </Grid>

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
      <Fade in={open}>
      
      <div className={`edit-note-box ${taskToEdit.color_name}`}>
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
                value={taskToEdit.priority_id} 
                onChange={(event) => dispatch({ 
                  type: 'EDIT_ONCHANGE', 
                  payload: { property: 'priority_id', value: event.target.value }
                })}>
                <FormControlLabel value="1" control={<RedRadio />} label="NOW" labelPlacement="top"/>
                <FormControlLabel value="2" control={<OrangeRadio />} label="Soon-ish" labelPlacement="top"/>
                <FormControlLabel value="3" control={<YellowRadio />} label="Later" labelPlacement="top"/>
                {/* <FormControlLabel value="4" control={<LightGreenRadio />} label="Light Green" labelPlacement="top"/>
                <FormControlLabel value="5" control={<GreenRadio />} label="Green" labelPlacement="top"/>
                <FormControlLabel value="6" control={<BlueRadio />} label="Blue" labelPlacement="top"/>
                <FormControlLabel value="7" control={<PurpleRadio />} label="Purple" labelPlacement="top"/>
                <FormControlLabel value="8" control={<DarkPurpleRadio />} label="Purple" labelPlacement="top"/>
                <FormControlLabel value="9" control={<BrownRadio />} label="Brown" labelPlacement="top"/>
                <FormControlLabel value="10" control={<GreyRadio />} label="Grey" labelPlacement="top"/> */}
              </RadioGroup>
            </FormControl>
          </section>
          <section className="add-btn">
            <Button variant="outlined" type="submit">
              Update Note
            </Button>
          </section> 
        </form>
      </div>
      </Fade>
      </Dialog>
    </>
  );
}

export default StickyNote;
