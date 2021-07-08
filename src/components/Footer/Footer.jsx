import React from 'react';
import './Footer.css';
import image from './Gennochio-Productions.png'
// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
  return <footer id="footer">
      <img className="Gennochio-Productions" src={image} alt="Pennochio with the words Gennochio Productions next to it" />
  </footer>;
}

export default Footer;
