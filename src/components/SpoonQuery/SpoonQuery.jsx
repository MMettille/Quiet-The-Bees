import React from 'react';


function SpoonQuery() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default SpoonQuery;
