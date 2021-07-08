import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import image from "./bee_kind_honeycomb2.png";
import imageTwo from "./nlo-infographic-spoon-theory_sm.jpeg";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText"

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
    align: "center",
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
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const history = useHistory("");
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [spoonInput, setSpoonInput] = useState(null);
  const [scroll, setScroll] = React.useState("paper");
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (event) => {
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
        <img src={image} width="30%" />
        <h1>It's a New Day!</h1>
        <h3>How many spoons are we working with?</h3>
        <Button onClick={handleOpen} variant="outlined">
          Interested in Learning More About Spoon Theory?
        </Button>

        <Grid container item xs={12} className={classes.root}>
          <form
            className="container-eighty-percent"
            onSubmit={handleSubmit}
            required={true}
          >
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
            <Button type="submit" variant="outlined">
              Submit
            </Button>
          </form>
        </Grid>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <figure>
              <img src={imageTwo} />
              <figcaption>
                What Is the Spoon Theory? If you live with chronic
                illness, explaining your condition can be tough. The spoon
                theory was created to do just that, and has since become so much
                more. - Source:{" "}
                <a
                  href="https://fibromyalgia.newlifeoutlook.com/infographics/what-is-spoon-theory/"
                  title="Infographic: If you live with chronic illness, explaining your condition can be tough. The spoon theory was created to do just that, and has since become so much more."
                >
                  New Life Outlook {" "}
                </a>
              </figcaption>
            </figure>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SpoonQuery;
