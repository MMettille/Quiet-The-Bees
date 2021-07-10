import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";

import image from "../Images/Bee_5.png";

function Nav() {
  // ⬇ Variables we need to declare and use in this component
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: "/login",
    text: "Login / Register",
  };

  if (user.id != null) {
    loginLinkData.path = "/main";
    loginLinkData.text = "Home";
  }

  return (
    <div className="nav">
      <h2 className="nav-title">Quiet The Bees</h2>

      <section className="nav-center">
        <img className="header-bee" src={image} />
      </section>

      <div className="nav-right">
        <Link className="navLink" to={loginLinkData.path}>
          {loginLinkData.text}
        </Link>

        {user.id && (
          <>
            <Link className="navLink" to="/braindump">
              Brain Dump
            </Link>
            <LogOutButton className="navLink" />
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;
