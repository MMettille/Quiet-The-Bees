import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom'

// ⬇ What Components we need to import
import Header from '../Header/Header';
import StickyNote from '../StickyNote/StickyNote';


import Box from '@material-ui/core/Box';

function Main() {

  const dispatch = useDispatch();
  const task = useSelector (store => store.task);

  useEffect(() => {
    dispatch({type: 'FETCH_TASK'})
  }, []);

  console.log(`Your tasks are:`, task);
  
    return (
      <>
        <Header />
        
        <h1>NOW</h1>
        <h4>These are the most important tasks. What are the consequences of not completing these things?</h4>
        <div className='task-container'>
          <Box 
            display="flex"
            flexWrap="wrap"
            p={2}
            m={2}
          >
            {task.map(item => {
              if (item.priority === 'NOW'){
                return <StickyNote key={item.id} item={item}/>
              }
            })}
          </Box>
        </div>
        <h1>Soon-ish</h1>
        <h4>These tasks don't need to happen immediately, but do need to happen soon. Can you set a due date?</h4>
          <Box 
            display="flex"
            flexWrap="wrap"
            p={2}
            m={2}
          >
            {/* {task.map(item => {
              if (item.priority === 'soonish'){
                return <StickyNote key={item.id} item={item}/>
              }
            })} */}
          </Box>
        <h1>Later</h1>
        <h4>These tasks are on your radar for later.</h4>
          <Box 
            display="flex"
            flexWrap="wrap"
            p={2}
            m={2}
          >
            {/* {task.map(item => {
              if (item.priority === 'later'){
                return <StickyNote key={item.id} item={item}/>
              }
            })} */}
          </Box>
      </>
  );
}

export default Main;
