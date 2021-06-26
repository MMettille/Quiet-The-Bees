import React, {useState} from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import image from './bee_kind_honeycomb2.png'


const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
}));

function TriggerQuery() {
  
    const dispatch = useDispatch();
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [triggerInput, setTriggerInput] = useState({})

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`User's Trigger Input is: `, triggerInput)
        // dispatch({type: 'ADD_TRIGGER_INPUT', payload: {
        //     trigger: triggerInput
        // }})
        // // ⬇ Resets the value to 0
        // setTriggerInput({});
        // ⬇ Will send user to a new page
    }

    return (
      <>
        <div className="container">
            <img src={image} />
            <h1>Any Failure Triggers to Be Aware Of?</h1>
            <button onClick={handleOpen}>Interested in Learning More About Failure Triggers?</button>
            <form onSubmit={handleSubmit}>
                <input type="text" 
                    placeholder="Trigger" 
                    value={triggerInput}
                    onChange={(event) => setTriggerInput(event.target.value)}
                />
                 <button type="submit">Submit</button>
            </form>
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
                <div className='visually_embed'>
                    <p>Some Text Here</p>
                </div>
            </Fade>
        </Modal>
        
    </>
  
  );

}

export default TriggerQuery;
