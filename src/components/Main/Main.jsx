// ⬇ What we need to import for functionality
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Masonry from "react-masonry-css";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
// ⬇ What Components we need to import
import Header from "../Header/Header";
import AddNewTask from "../AddNewTask/AddNewTask";
import StickyNote from "../StickyNote/StickyNote";
import Fab from "../Fab/Fab";
// ⬇ Custom styling for material-ui
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

function Main() {
  // ⬇ What functions we need to use in this component
  const classes = useStyles();
  const dispatch = useDispatch();
  // ⬇ Variables we need to declare and use in this component
  const task = useSelector((store) => store.task);

  // ⬇ On page load, fetch the tasks from the database
  useEffect(() => {
    dispatch({ type: "FETCH_TASK" });
  }, []);

  // ⬇ Breakpoints for masonry css on the /braindump page
  const breakpoints = {
    default: 8,
    1250: 7,
    1100: 6,
    1000: 5,
    800: 4,
    600: 3,
    450: 2,
    320: 1,
  };
  // ⬇ Breakpoints for masonry css on the /main Page
  const MainBreakpoints = {
    default: 4,
    1300: 3,
    1050: 2,
    750: 1,
  };

  return (
    <>
      <Header />
      <AddNewTask />

      <div className="container">
        <div className="container">
          <h2>NOW</h2>
          <h4>These are the most important tasks.</h4>
          <h5>
            HINT: What are the consequences of not completing these things?
          </h5>
          <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {task.map((item) => {
              if (item.color_id === 1) {
                return <StickyNote key={item.id} item={item} />;
              }
            })}
          </Masonry>
        </div>
        <Grid container className={classes.root} spacing={3}>
          <Grid item xs={6}>
              <h2>Soon-ish</h2>
              <h4 className="equal-box">
                These tasks don't need to happen immediately, but do need to
                happen soon.
              </h4>
              <h5>HINT: Can you set a due date?</h5>

            <Masonry
              breakpointCols={MainBreakpoints}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {task.map((item) => {
                if (item.color_id === 2) {
                  return <StickyNote key={item.id} item={item} />;
                }
              })}
            </Masonry>
          </Grid>
          <Grid item xs={6}>
            <h2>Later</h2>
            <h4>These tasks are the ones you don't want to forget and are on your radar for later.</h4>
            <h5>HINT: Do these if you have extra spoons!</h5>
            <Masonry
              breakpointCols={MainBreakpoints}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {task.map((item) => {
                if (item.color_id === 3) {
                  return <StickyNote key={item.id} item={item} />;
                }
              })}
            </Masonry>
          </Grid>
        </Grid>
        <div className="container">
          <h2>TBD</h2>
          <h4>These tasks still need to be sorted.</h4>
          <h5>HINT: What are the consequences of not doing these things?</h5>
          <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {task.map((item) => {
              if (item.color_id === 10) {
                return <StickyNote key={item.id} item={item} />;
              }
            })}
          </Masonry>
        </div>
      </div>
      <Fab />
    </>
  );
}

export default Main;
