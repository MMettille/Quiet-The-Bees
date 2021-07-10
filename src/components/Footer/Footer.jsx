// ⬇ What we need to import for functionality
import React from 'react';
// ⬇ What Components we need to import
import './Footer.css';
import image from "../Images/Gennochio-Productions.png"

function Footer() {
  return <footer id="footer">
      <img className="Gennochio-Productions" src={image} alt="Pennochio with the words Gennochio Productions next to it" />
  </footer>;
}

export default Footer;
