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

      <div id="main-container">
      <h2>NOW</h2>
      <h4>
        These are the most important tasks. 
      </h4>
      <h5>HINT: What are the consequences of not
        completing these things?</h5>
      <div className="minimum-height-container">
      <Grid container spacing={3}>
        {task.map((item) => {
          if (item.color_id === 1) {
            return <StickyNote key={item.id} item={item} />;
          }
        })}
      </Grid>
      </div>
      
      <h2>Soon-ish</h2>
      <h4>
        These tasks don't need to happen immediately, but do need to happen
        soon. 
      </h4>
      <h5>HINT: Can you set a due date?</h5>
      <Grid container spacing={3}>
        {task.map((item) => {
          if (item.color_id === 2) {
            return <StickyNote key={item.id} item={item} />;
          }
        })}
      </Grid>
      <h2>Later</h2>
      <h4>These tasks are on your radar for later.</h4>
      <h5>HINT: Have a lot of spoons today? Tackle these!</h5>
      <Grid container spacing={.5}>
        {task.map((item) => {
          if (item.color_id === 3) {
            return <StickyNote key={item.id} item={item} />;
          }
        })}
      </Grid>
      </div>
    </>
  );
}

export default Main;
