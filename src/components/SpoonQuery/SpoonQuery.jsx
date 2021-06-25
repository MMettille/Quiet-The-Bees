import React, {useState} from 'react';

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

function SpoonQuery() {
  
    const classes = useStyles();
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    return (
      <>
        <div className="container">
        <img src="./bee_kind_honeycomb2.png" />
        <h1>It's a New Day!</h1>
        <h3>How many spoons are we working with?</h3>
        <button onClick={handleOpen}>Interested in Learning More About Spoon Theory?</button>
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
                    <img className='visually_embed_infographic' src='https://visual.ly/node/image/311959?_w=540' alt='What Is Spoon Theory?' />
                    <div className='visually_embed_cycle'></div>
                    <script type='text/javascript' src='https://a.visual.ly/api/embed/311959?width=540' className='visually_embed_script' id='visually_embed_script_311959'></script>
                    <p> From <a href='https://visual.ly?utm_source=content-embed&utm_medium=embed'>Visually</a>.</p>
                </div>
            </Fade>
        </Modal>
    </>
  
  );

}

export default SpoonQuery;
