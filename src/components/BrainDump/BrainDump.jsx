import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom'

// ⬇ What Components we need to import
import Header from '../Header/Header';
import AddNewTask from '../AddNewTask/AddNewTask';
import StickyNote from '../StickyNote/StickyNote';

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
  checked: {},
})((props) => <Radio color="default" {...props} />);

const OrangeRadio = withStyles({
  root: {
    color: "#ff9800",
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const YellowRadio = withStyles({
  root: {
    color: "#ffeb3b",
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const GreenRadio = withStyles({
  root: {
    color: "#80cbc4",
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const LightGreenRadio = withStyles({
  root: {
    color: "#aed581",
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const PurpleRadio = withStyles({
  root: {
    color: "#b39ddb",
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const BrownRadio = withStyles({
  root: {
    color: "#a1887f",
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const BlueRadio = withStyles({
  root: {
    color: "#90caf9",
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const DarkPurpleRadio = withStyles({
  root: {
    color: "#9575cd",
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const GreyRadio = withStyles({
  root: {
    color: "#9e9e9e",
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

function Main() {

  const dispatch = useDispatch();
  const classes = useStyles();
  const task = useSelector (store => store.task);

  useEffect(() => {
    dispatch({type: 'FETCH_TASK'})
  }, []);
  
      return (
      <>
        <Header />
        
        <AddNewTask />
        <div className="container">
          <h2>SORT HERE</h2>
          <FormControlLabel value="*" control={<Radio color="default"/>} label="ALL" labelPlacement="end"/>
          <FormControlLabel value="NOW" control={<RedRadio />} label="NOW" labelPlacement="end"/>
          <FormControlLabel value="soonish" control={<OrangeRadio />} label="Soon-ish" labelPlacement="end"/>
          <FormControlLabel value="later" control={<YellowRadio />} label="Later" labelPlacement="end"/>
          <FormControlLabel value="Light Green" control={<LightGreenRadio />} label="Light Green" labelPlacement="end"/>
          <FormControlLabel value="Green" control={<GreenRadio />} label="Green" labelPlacement="end"/>
          <FormControlLabel value="Blue" control={<BlueRadio />} label="Blue" labelPlacement="end"/>
          <FormControlLabel value="Purple" control={<PurpleRadio />} label="Purple" labelPlacement="end"/>
          <FormControlLabel value="Dark Purple" control={<DarkPurpleRadio />} label="Purple" labelPlacement="end"/>
          <FormControlLabel value="Brown" control={<BrownRadio />} label="Brown" labelPlacement="end"/>
          <FormControlLabel value="Grey" control={<GreyRadio />} label="Grey" labelPlacement="end"/>
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
