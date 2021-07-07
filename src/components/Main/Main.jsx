import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// ⬇ What Components we need to import
import Header from "../Header/Header";
import AddNewTask from "../AddNewTask/AddNewTask";
import StickyNote from "../StickyNote/StickyNote";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

function Main() {
  const dispatch = useDispatch();
  const task = useSelector((store) => store.task);

  useEffect(() => {
    dispatch({ type: "FETCH_TASK" });
  }, []);

  console.log(task);
  return (
    <>
      <Header />
      <AddNewTask />

      <h1>NOW</h1>
      <h3>
        These are the most important tasks. 
      </h3>
      <h4>HINT: What are the consequences of not
        completing these things?</h4>
      <div className="minimum-height-container">
      <Grid container spacing={3}>
        {task.map((item) => {
          if (item.priority_id === 1) {
            return <StickyNote key={item.id} item={item} />;
          }
        })}
      </Grid>
      </div>
      
      <h1>Soon-ish</h1>
      <h3>
        These tasks don't need to happen immediately, but do need to happen
        soon. 
      </h3>
      <h4>HINT: Can you set a due date?</h4>
      <Grid container spacing={3}>
        {task.map((item) => {
          if (item.priority_id === 2) {
            return <StickyNote key={item.id} item={item} />;
          }
        })}
      </Grid>
      <h1>Later</h1>
      <h3>These tasks are on your radar for later.</h3>
      <h4>HINT: Have a lot of spoons today? Tackle these!</h4>
      <Grid container spacing={3}>
        {task.map((item) => {
          if (item.priority_id === 3) {
            return <StickyNote key={item.id} item={item} />;
          }
        })}
      </Grid>
    </>
  );
}

export default Main;
