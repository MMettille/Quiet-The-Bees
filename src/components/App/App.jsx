// ⬇ What we need to import for functionality
import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { useDispatch } from "react-redux";
// ⬇ Importing the default font for material ui
import "@fontsource/roboto";



import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

// ⬇ What Components we need to import
import "./App.css";
import AboutPage from "../AboutPage/AboutPage";
import BrainDump from "../BrainDump/BrainDump";
import Footer from "../Footer/Footer";
import LandingPage from '../LandingPage/LandingPage'
import LoginPage from "../LoginPage/LoginPage";
import Main from "../Main/Main";
import Nav from "../Nav/Nav";
import RegisterPage from "../RegisterPage/RegisterPage";
import SpoonGraph from "../SpoonGraph/SpoonGraph";
import SpoonQuery from "../SpoonQuery/SpoonQuery";
import TriggerQuery from "../TriggerQuery/TriggerQuery";
import WordCloud from "../WordCloud/WordCloud";

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
          {/* Visiting localhost:3000 will redirect to localhost:3000/landingpage */}
          <Redirect exact from="/" to="/landingpage" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* Visiting localhost:3000/ will show the landing page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/landingpage"
          >
            <LandingPage />
          </Route>

          <ProtectedRoute
            // logged in shows SpoonGraph else shows LandingPage
            exact
            path="/spoongraph"
          >
            <SpoonGraph />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UserPage else shows LandingPage
            exact
            path="/spoon"
          >
            <SpoonQuery />
          </ProtectedRoute>
          
          <ProtectedRoute
            // logged in shows UserPage else shows LandingPage
            exact
            path="/wordCloud"
          >
            <WordCloud />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UserPage else shows LandingPage
            exact
            path="/trigger"
          >
            <TriggerQuery />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UserPage else shows LandingPage
            exact
            path="/main"
          >
            <Main />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UserPage else shows LandingPage
            exact
            path="/braindump"
          >
            <BrainDump />
          </ProtectedRoute>


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
            <RegisterPage />
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
