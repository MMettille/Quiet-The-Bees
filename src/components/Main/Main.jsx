import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom'

import Header from '../Header/Header'



function Main() {

  const dispatch = useDispatch();
  const task = useSelector (store => store.task)

  useEffect(() => {
    dispatch({type: 'FETCH_TASK'})
  }, []);

  console.log(`Your tasks are:`, task);

    return (
      <>
        <Header />
        
        <h1>NOW</h1>
        <h4>These are the most important tasks. What are the consequences of not completing these things?</h4>
        {task.map(item => {
          if (item.priority === 'NOW'){
          console.log('Now tasks', item)
          }
        })}
        <h1>Soon-ish</h1>
        <h4>These tasks don't need to happen immediately, but do need to happen soon. Can you set a due date?</h4>
        {task.map(item => {
          if (item.priority === 'soonish'){
          console.log('soon tasks', item)
          }
        })}
        <h1>Later</h1>
        <h4>These tasks are on your radar for later.</h4>
        {task.map(item => {
          if (item.priority === 'later'){
          console.log('later tasks', item)
          }
        })}
      </>
  );
}

export default Main;
