import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom'

// ⬇ What Components we need to import
import Header from '../Header/Header';
import AddNewTask from '../AddNewTask/AddNewTask';
import StickyNote from '../StickyNote/StickyNote';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import IconButton from '@material-ui/core/IconButton';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Checkbox from "@material-ui/core/Checkbox";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const RedRadio = withStyles({
  root: {
    color: "#e53935",
  },
})((props) => <Radio color="default" {...props} />);

const OrangeRadio = withStyles({
  root: {
    color: "#ff9800",
  },
})((props) => <Radio color="default" {...props} />);

const YellowRadio = withStyles({
  root: {
    color: "#ffeb3b",
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

function BrainDump() {

  const dispatch = useDispatch();
  const classes = useStyles();
  const task = useSelector (store => store.task);
  const category = useSelector (store => store.category)
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
  })

  const handleClose = () => {
    setOpen(false);
  };
  
  useEffect(() => {
    dispatch({type: 'FETCH_TASK'})
    dispatch({type: 'FETCH_CATEGORY'})
  }, []);
  
  const handleClick = () => {
    console.log(value)
    setOpen(true)
  }

  const handleSave = (event) => {
    event.preventDefault()
    console.log(newCategory)
  }
 
      return (
      <>
        <Header />
        
        <AddNewTask />
        <div className="container">
          <h2>SORT HERE</h2>
          <RadioGroup row aria-label="sort-by-category" value={value} onChange={(event) => setValue(event.target.value)}>
            <FormControlLabel value="*" control={<Radio color="default"/>} label="ALL" labelPlacement="end"/>
            <FormControlLabel value="1" control={<RedRadio />} label="NOW" labelPlacement="end"/>
            <FormControlLabel value="2" control={<OrangeRadio />} label="Soon-ish" labelPlacement="end" />
            <FormControlLabel value="3" control={<YellowRadio />} label="Later" labelPlacement="end"/>
            <FormControlLabel value="4" control={<LightGreenRadio />} label="Light Green" labelPlacement="end"/>
            <FormControlLabel value="5" control={<GreenRadio />} label="Green" labelPlacement="end"/>
            <FormControlLabel value="6" control={<BlueRadio />} label="Blue" labelPlacement="end"/>
            <FormControlLabel value="7" control={<PurpleRadio />} label="Purple" labelPlacement="end"/>
            <FormControlLabel value="8" control={<DarkPurpleRadio />} label="Purple" labelPlacement="end"/>
            <FormControlLabel value="9" control={<BrownRadio />} label="Brown" labelPlacement="end"/>
            <FormControlLabel value="10" control={<GreyRadio />} label="Grey" labelPlacement="end"/>
            <IconButton aria-label="color-pallete-button" onClick={handleClick}>
              <ColorLensIcon fontSize="large"/>
            </IconButton>
          </RadioGroup>
        </div>
        <div className={classes.root}>
          <Grid container spacing={3}>
            {task.map(item => {
                  return <StickyNote key={item.id} item={item}/>
            })}
          </Grid>
        </div>
        
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Custom Categories</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Customize your categories below. Check the colors to hide and show those colors. Change the title of the category by typing the name in the text box.
          </DialogContentText>
          <List>
            <ListItem alignItems="center">
              <Checkbox className="red" checked={true} disabled={true}/>
              <RadioButtonUncheckedIcon className='red'/>
              <TextField
              label="NOW"
              variant="outlined"
              disabled={true}
              />
            </ListItem>
            <ListItem alignItems="center"  >
              <Checkbox checked={true} disabled={true}/>
              <RadioButtonUncheckedIcon className='orange'/>
              <TextField
              label="Soon-ish"
              variant="outlined"
              disabled={true}
              />
            </ListItem>
            <ListItem alignItems="center" >
              <Checkbox checked={true} disabled={true}/>
              <RadioButtonUncheckedIcon className='yellow'/>
              <TextField
              label="Later"
              variant="outlined"
              disabled={true}
              />
            </ListItem>
            <ListItem alignItems="center" >
              <Checkbox checked ={category[0]?.isChecked}/>
              <RadioButtonUncheckedIcon className='light-green'/>
              <TextField
              label={category[0]?.category}
              variant="outlined"
              disabled={!category[0]?.isChecked}
              />
            </ListItem>
            <ListItem alignItems="center" >
              <Checkbox checked ={category[1]?.isChecked}/>
              <RadioButtonUncheckedIcon className='green'/>
              <TextField
              label={category[1]?.category}
              variant="outlined"
              disabled={!category[1]?.isChecked}
              />
            </ListItem>
            <ListItem alignItems="center" >
              <Checkbox checked ={category[2]?.isChecked}/>
              <RadioButtonUncheckedIcon className='blue'/>
              <TextField
              label={category[2]?.category}
              variant="outlined"
              disabled={!category[2]?.isChecked}
              />
            </ListItem>
            <ListItem alignItems="center" >
              <Checkbox checked ={category[3]?.isChecked}/>
              <RadioButtonUncheckedIcon className='purple'/>
              <TextField
              label={category[3]?.category}
              variant="outlined"
              disabled={!category[3]?.isChecked}
              />
            </ListItem>
            <ListItem alignItems="center" >
              <Checkbox checked ={category[4]?.isChecked}/>
              <RadioButtonUncheckedIcon className='dark-purple'/>
              <TextField
              label={category[4]?.category}
              variant="outlined"
              disabled={!category[4]?.isChecked}
              />
            </ListItem>
            <ListItem alignItems="center" >
              <Checkbox checked ={category[5]?.isChecked}/>
              <RadioButtonUncheckedIcon className='brown'/>
              <TextField
              label={category[5]?.category}
              variant="outlined"
              disabled={!category[5]?.isChecked}
              />
            </ListItem>
            <ListItem alignItems="center" >
              <Checkbox checked ={category[6]?.isChecked}/>
                <RadioButtonUncheckedIcon className='grey'/>
                <TextField
                label={category[6]?.category}
                variant="outlined"
                disabled={!category[6]?.isChecked}
                />
            </ListItem>
          </List>
   
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
      </>
  );
}

export default BrainDump;
