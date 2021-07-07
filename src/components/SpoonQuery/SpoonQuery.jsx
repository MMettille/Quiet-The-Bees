import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import image from "./bee_kind_honeycomb2.png";
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    padding: "20",
    justifyContent: "center",
    alignContent: "center",
    align: "center"
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 1,
  },
  {
    value: 2,
  },
  {
    value: 3,
  },
  {
    value: 4,
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 6,
  },
  {
    value: 7,
  },
  {
    value: 8,
  },
  {
    value: 9,
  },
  {
    value: 10,
    label: "10",
  },
];

function valuetext(value) {
  return `${value}`;
}

function SpoonQuery() {
  const history = useHistory("");
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [spoonInput, setSpoonInput] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`User's Spoon Input is: `, spoonInput);
    dispatch({
      type: "ADD_SPOON_INPUT",
      payload: {
        spoon: spoonInput,
      },
    });
    // ⬇ Resets the value to 0
    setSpoonInput(null);
    // ⬇ Will send user to a new page
    history.push("/trigger");
  };

  return (
    <>
      <div className="container">
        <img src={image} width="50%" />
        <h1>It's a New Day!</h1>
        <h3>How many spoons are we working with?</h3>
        <Button onClick={handleOpen} variant="outlined">
          Interested in Learning More About Spoon Theory?
        </Button>

        <Grid container item xs={12} className={classes.root}>
            <form className="container-eighty-percent" onSubmit={handleSubmit} required={true}>
              <Slider
                className="important"
                defaultValue={5}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-always"
                step={1}
                marks={marks}
                valueLabelDisplay="on"
                min={0}
                max={10}
                onChange={(event, newValue) => setSpoonInput(newValue)}
              />
              <Button type="submit" variant="outlined">Submit</Button>
            </form>
        </Grid>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="visually_embed">
            <img
              className="visually_embed_infographic"
              src="https://visual.ly/node/image/311959?_w=540"
              alt="What Is Spoon Theory?"
            />
            <div className="visually_embed_cycle"></div>
            <script
              type="text/javascript"
              src="https://a.visual.ly/api/embed/311959?width=540"
              className="visually_embed_script"
              id="visually_embed_script_311959"
            ></script>
            <p>
              {" "}
              From{" "}
              <a href="https://visual.ly?utm_source=content-embed&utm_medium=embed">
                Visually
              </a>
              .
            </p>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

export default SpoonQuery;
