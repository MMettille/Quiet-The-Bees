// ⬇ What we need to import for functionality
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// ⬇ What we need from material-ui
import ListItem from "@material-ui/core/ListItem";
import Checkbox from "@material-ui/core/Checkbox";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function Category({ category }) {
  // ⬇ What functions we need to use in this component
  const dispatch = useDispatch();
  // ⬇ Variables we need to declare and use in this component
  const taskToEdit = useSelector((store) => store.taskToEdit);
  const [hidden, setHidden] = useState(false);
  const [disabled, setDisabled] = useState(true)
  const [userInput, setUserInput] = useState('');

  // ⬇ Function to set which category is going to be edited and sent to redux
  const handleEdit = () => {
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

  // ⬇  Dispatches the changes to redux-saga and the database
  const handleSave = (event) => {
    event.preventDefault();
    // ⬇ PUT REQUEST to /task/:id
    dispatch({type: 'EDIT_CATEGORY', payload: taskToEdit})
    // ⬇ Close the Modal 
    setDisabled(true)
  }

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
