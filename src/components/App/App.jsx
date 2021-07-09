import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import "@fontsource/roboto";

import { useDispatch } from "react-redux";

import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

// ⬇ What Components we need to import
import AboutPage from "../AboutPage/AboutPage";
import BrainDump from "../BrainDump/BrainDump";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import SpoonGraph from "../SpoonGraph/SpoonGraph";
import SpoonQuery from "../SpoonQuery/SpoonQuery";
import WordCloud from "../WordCloud/WordCloud";
import TriggerQuery from "../TriggerQuery/TriggerQuery";
import Main from "../Main/Main";
import LandingPage from '../LandingPage/LandingPage'

import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <div id="page-container">
    <Router>
      
      <div id="content-wrap">
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/landingpage" />
          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/landingpage"
          >
            <LandingPage />
          </Route>
          <ProtectedRoute
            // logged in shows SpoonGraph else shows LoginPage
            exact
            path="/spoongraph"
          >
            <SpoonGraph />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/spoon"
          >
            <SpoonQuery />
          </ProtectedRoute>
          '
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/wordCloud"
          >
            <WordCloud />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/trigger"
          >
            <TriggerQuery />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/main"
          >
            <Main />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/braindump"
          >
            <BrainDump />
          </ProtectedRoute>
          {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/spoon"
            // - else shows LoginPage at /login
            exact
            path="/login"
            authRedirect="/spoon"
          >
            <LoginPage />
          </ProtectedRoute>
          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/spoon"
            // - else shows RegisterPage at "/registration"
            exact
            path="/registration"
            authRedirect="/spoon"
          >
            <LoginPage />
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        
        </div>
        <Footer />
      
    </Router>
    </div>
  );
}

export default App;
