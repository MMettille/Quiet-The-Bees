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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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

function Main() {

  const dispatch = useDispatch();
  const classes = useStyles();
  const task = useSelector (store => store.task);
  const [value, setValue] = useState('')
  useEffect(() => {
    dispatch({type: 'FETCH_TASK'})
  }, []);
  
  const handleClick = () => {
    console.log(value)
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
            <FormControlLabel value="2" control={<OrangeRadio />} label="Soon-ish" labelPlacement="end"/>
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
        
        
      </>
  );
}

export default Main;
