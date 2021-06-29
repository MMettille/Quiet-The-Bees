import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom'

import Box from '@material-ui/core/Box';

function StickyNote() {

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
        <div className='task-container'>
          <Box 
            display="flex"
            flexWrap="wrap"
            p={2}
            m={2}
          >
            {task.map(item => {
              if (item.priority === 'NOW'){
                return (
                  <div className="note-box">
                    <section className="note-title">
                        <p>{item.taskName}</p>
                    </section>
                    <section className="note-edit-btn">
                        <button >
                            Edit
                        </button>
                    </section>
                  </div>
                );
              }
            })}
          </Box>
        </div>
        <h1>Soon-ish</h1>
        <h4>These tasks don't need to happen immediately, but do need to happen soon. Can you set a due date?</h4>

        <h1>Later</h1>
        <h4>These tasks are on your radar for later.</h4>

      </>
  );
}

export default StickyNote;
