import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Masonry from "react-masonry-css";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

// ⬇ What Components we need to import
import Header from "../Header/Header";
import AddNewTask from "../AddNewTask/AddNewTask";
import StickyNote from "../StickyNote/StickyNote";

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
  const classes = useStyles();
  const dispatch = useDispatch();
  const task = useSelector((store) => store.task);

  useEffect(() => {
    dispatch({ type: "FETCH_TASK" });
  }, []);

  const breakpoints = {
    default: 7,
    1100: 5,
    1000: 4,
    800: 3,
    600: 2,
    400: 1,
  };
  const MainBreakpoints = {
    default: 3,
    1200: 2,
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
        <h5>HINT: What are the consequences of not completing these things?</h5>
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
            <h4>
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
            <h4>These tasks are on your radar for later.</h4>
            <h5>HINT: Have a lot of spoons today? Tackle these!</h5>
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
</div>
    </>
  );
}

export default Main;
