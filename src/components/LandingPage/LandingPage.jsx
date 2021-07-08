import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LandingPage.css";

// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";

function LandingPage() {
  const history = useHistory();

  const onLogin = (event) => {
    history.push("/login");
  };

  return (
    <div className="container">
      <div className="grid">
        <div className="grid-col grid-col_8">
          <p>
          Staying organized in this information saturated world is next to impossible - there are things to remember, to-do lists
          to make, recipes to try, books to read, moods and energy to track.. Luckily, there are plenty of apps out there to help
          with this - unfortunately, they were all built for a neurotypical brain. So what does one do? Uses several apps and systems,
          trying to find one that will work for your brain - Google Notes, Mood Tracker Apps, the app from your therapist, physical planners,
          sticky notes, text messages to your partner...and it is quite mentally taxing trying to keep track of all those moving pieces!
          </p>

          <p>
          This app provides one centralized location for all the things buzzing around in your brain - no more finding sticky notes under a shoe!
          At the beginning of your day, login and check-in with yourself, guided by this app. Do you have a lot of energy? Are you feeling tired?
          What is preventing you from getting stuff done today?
          </p>

          <p>
            The main page is all about you, today - what do you need to get done? What's happening? As you progress throughout the day, if things pop
            into your head that you don't want to forget, write it down so you can quiet the buzz and stay on task!
          </p>
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
