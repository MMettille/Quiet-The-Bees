import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

// ⬇ What Components we need to import
import './StickyNote.css'
// ⬇ What we need from material ui 
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

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

function StickyNote(item) {

  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  const editTask = useSelector(store => store.editTask)

  const handleClose = () => {
    setOpen(false)
  } 

  const handleEdit = () => {
    console.log('Task to edit:', editTask)
    dispatch({type: 'TASK_TO_EDIT', payload: editTask})
    setOpen(true);
  }
  
  const handleChange = (event) => { 
    dispatch({ 
      type: 'EDIT_ONCHANGE', 
      payload: { property: 'taskName', value: event.target.value }
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // ⬇ PUT REQUEST to /task/:id
    axios.put(`/books/${editTask.id}`, editTask)
    .then( response => {
      // ⬇ clean up reducer data            
      dispatch({ type: 'EDIT_CLEAR' });
      // ⬇ Close the Modal 
      setOpen(false);
      // ⬇ Refresh the tasks
      dispatch({type: 'FETCH_TASK'})
    })
    .catch(error => {
      console.log('error on PUT: ', error);
    })
  }

  return (
    <>
      <div className="note-box">
          <section className="note-body">
              <p>{item.item.taskName}</p>
          </section>
          <section className="note-btns">
              <button onClick={handleEdit}>
                  Edit
              </button>
              <button>
                  Delete
              </button>
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
            value={item.item.taskName}
          />
          </section>
          <section className="note-btns">
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
