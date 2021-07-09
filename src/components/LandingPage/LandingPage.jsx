import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LandingPage.css";

// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";
import bee_kind_hexagon from "../Images/bee_kind_hexagon.png";
function LandingPage() {
  const history = useHistory();

  const onLogin = (event) => {
    history.push("/login");
  };

  const handleClick = () => {
    history.push("/registration");
  };

  return (
      <div className="container">
<img 
          src={bee_kind_hexagon}
          alt="Image of a honeycomb hexagon with the words Bee Kind written in the middle"
          className="bee-kind-hexagon"
        />
            <p>
              Staying organized in this information saturated world is next to
              impossible - there are things to remember, to-do lists to make,
              recipes to try, books to read, moods and energy to track...and if
              you have anxiety or are neurodivergent, those thoughts can constantly
              be battling for your attention - almost as if there was a hive of bees
              buzzing noisily in your head!
            </p>

            <p>
              We've all been there - you get frustrated by all those moving parts, so you
              download this productivity app, that calender app, that mood tracker app, or buy a new pretty planner. The
              fundamental flaw with these products is that they were built for the "typical" brain...so we use it for a
              few days, maybe a week, then forget about it.
              This app solves that problem by providing one centralized location for all the those
              bees flying around in your brain.
               {/* - and what makes this app <i>work </i>
              is that it was not built for the "typical" brain.  */}
              {/* No more downloading note apps
              and calendar apps and forgetting which one you used to write this note or that one.
              No more spending money on planners and organizers that you never use.               */}
            </p>

            <p>
              At the beginning of your day, sit down and answer questions about your mental health,
              then make a game plan for what you need to accomplish. And if things pop into your head that
              you don't want to forget, write it down so you can<br>
              </br><strong>Quiet The Bees and Stay on Task!</strong>
            </p>
            <br/>

            <button className="btn btn_sizeSm" onClick={handleClick}>
                Register
              </button>
              <button className="btn btn_sizeSm" onClick={onLogin}>
                Login
              </button>
         
      </div>
  )
}

export default LandingPage;
