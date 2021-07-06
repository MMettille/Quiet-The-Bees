import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom'

// ⬇ What we need from material-ui
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Checkbox from "@material-ui/core/Checkbox";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function Category({category}) {

  const dispatch = useDispatch();
  
  console.log(category)
  return (
    <>
      <ListItem alignItems="center" >
        <Checkbox
        checked={category.isChecked}
        />
        <RadioButtonUncheckedIcon className={category.color_name}/>
        <TextField
        label={category.category}
        variant="outlined"
        disabled={!category.isChecked}
        />
        </ListItem>
    </>
  );
}

export default Category;
