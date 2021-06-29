import React, {useState, useEffect} from 'react';
import { useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom'

import Header from '../Header/Header'



function Main() {

  useEffect(() => {
    dispatchEvent({ type: 'FETCH_TASK'})
  }, []);

    return (
      <>
        <Header />
        
        <h1>NOW</h1>
        <h4>These are the most important tasks. What are the consequences of not completing these things?</h4>

        <h1>Soon-ish</h1>
        <h4>These tasks don't need to happen immediately, but do need to happen soon. Can you set a due date?</h4>

        <h1>Later</h1>
        <h4>These tasks are on your radar for later.</h4>
      </>
  );
}

export default Main;
