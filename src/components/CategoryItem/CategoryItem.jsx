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
  const [disabled, setDisabled] = useState(true)
  const [toEdit, setToEdit] = useState(category);
  const [hidden, setHidden] = useState(true)
  // ⬇ Function to set which category is going to be edited and sent to redux
  const handleEdit = () => {
    setHidden(!hidden)
    setDisabled(!disabled)
  }

  // ⬇  Dispatches the changes to redux-saga and the database
  const handleSave = (event) => {
    event.preventDefault();
    // ⬇ PUT REQUEST to /task/:id
    dispatch({type: 'EDIT_CATEGORY', payload: toEdit})
    // ⬇ Close the Modal 
    handleEdit()
  }

  console.log(toEdit)
  return (
    <>
      <ListItem alignItems="center">
        <Checkbox
          checked={disabled}
          onChange={handleEdit}
        />
        <RadioButtonUncheckedIcon className={category.color_name} />
        <TextField
          label={category.category}
          value={toEdit.category}
          variant="outlined"
          disabled={disabled}
          onChange={(event) =>
            setToEdit({ ...category, category: event.target.value })
            }
        />
        {hidden ? (<></>) : (<Button variant="outlined" onClick={handleSave}>Save</Button>)}
      </ListItem>
    </>
  );
}

export default Category;
