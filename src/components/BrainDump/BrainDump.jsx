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
    '&$checked': {
      color: "#c62828",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const OrangeRadio = withStyles({
  root: {
    color: "#ff9800",
    '&$checked': {
      color: "#f57c00",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const YellowRadio = withStyles({
  root: {
    color: "#ffeb3b",
    '&$checked': {
      color: "#ffeb3b",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const GreenRadio = withStyles({
  root: {
    color: "#80cbc4",
    '&$checked': {
      color: "#009688",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const PurpleRadio = withStyles({
  root: {
    color: "#b39ddb",
    '&$checked': {
      color: "#7e57c2",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const BrownRadio = withStyles({
  root: {
    color: "#bcaaa4",
    '&$checked': {
      color: "#8d6e63",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const BlueRadio = withStyles({
  root: {
    color: "#90caf9",
    '&$checked': {
      color: "#42a5f5",
    },
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
          <FormControlLabel value="NOW" control={<Radio color="default"/>} label="ALL" labelPlacement="end"/>
          <FormControlLabel value="NOW" control={<RedRadio />} label="NOW" labelPlacement="end"/>
          <FormControlLabel value="soonish" control={<OrangeRadio />} label="soon-ish" labelPlacement="end"/>
          <FormControlLabel value="later" control={<YellowRadio />} label="later" labelPlacement="end"/>
          <FormControlLabel value="something" control={<GreenRadio />} label="something" labelPlacement="end"/>
          <FormControlLabel value="something2" control={<PurpleRadio />} label="something2" labelPlacement="end"/>
          <FormControlLabel value="something3" control={<BlueRadio />} label="something3" labelPlacement="end"/>
          <FormControlLabel value="something4" control={<BrownRadio />} label="something4" labelPlacement="end"/>
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
