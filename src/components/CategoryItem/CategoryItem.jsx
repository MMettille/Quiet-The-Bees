import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// ⬇ What we need from material-ui

import ListItem from "@material-ui/core/ListItem";
import Checkbox from "@material-ui/core/Checkbox";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function Category({ category }) {
  const dispatch = useDispatch();
  
  const [hidden, setHidden] = useState(false);
  const [disabled, setDisabled] = useState(true)
  const taskToEdit = useSelector((store) => store.taskToEdit);
  
  const handleEdit = () => {
    console.log('Task to edit:', category)
    setHidden(true)
    dispatch({type: 'TASK_TO_EDIT', payload: category})
    setDisabled(false)
  }
  
  // ⬇ Dispatches the changes to redux after each change
  const handleChange = (event) => { 
    setUserInput(event.target.value)
    dispatch({ 
      type: 'EDIT_ONCHANGE', 
      payload: { property: 'category', value: event.target.value }
    });
  }

  // ⬇ 
  const handleSave = (event) => {
    event.preventDefault();
    // ⬇ PUT REQUEST to /task/:id
    dispatch({type: 'EDIT_CATEGORY', payload: taskToEdit})
    // ⬇ Close the Modal 
    setDisabled(true)
  }

  const [userInput, setUserInput] = useState('');

  return (
    <>
      <ListItem alignItems="center">
        <Checkbox
          checked={true}
          disabled={true}
        />
        <RadioButtonUncheckedIcon className={category.color_name} />
        <TextField
          label={category.category}
          value={userInput}
          variant="outlined"
          disabled={disabled}
          onChange={(event) => handleChange(event)}
        />
        {hidden ? (<Button variant="outlined" onClick={handleSave}>Save</Button>) : (<Button variant="outlined" onClick={handleEdit}>Edit</Button>)}
      </ListItem>
    </>
  );
}

export default Category;
