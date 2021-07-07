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

  const taskToEdit = useSelector((store) => store.taskToEdit);
  const handleCheck = (category) => {
    console.log("this category", category);
    // setHidden(true);
    // // setChecked(checked)
    // dispatch({ type: "TASK_TO_EDIT", payload: category });
    // dispatch({
    //   type: "EDIT_ONCHANGE",
    //   payload: { property: "isChecked", value: !category.isComplete },
    // });
  };

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
          variant="outlined"
          onChange={() => handleCheck}
        />
        {hidden ? <Button variant="outlined" onClick={handleSave}>Save</Button> : <Button variant="outlined" onClick={handleEdit}>Edit</Button>}
      </ListItem>
    </>
  );
}

export default Category;