import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

// ⬇ What Components we need to import
import './StickyNote.css'

function StickyNote(item) {

  const dispatch = useDispatch();

  console.log (item)
    return (
      <>
        <div className="note-box">
            <section className="note-body">
                <p>{item.item.taskName}</p>
            </section>
            <section className="note-btns">
                <button>
                    Edit
                </button>
                <button>
                    Delete
                </button>
            </section>
        </div>
      </>
  );
}

export default StickyNote;
