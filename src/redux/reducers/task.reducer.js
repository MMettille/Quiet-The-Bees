const task = (state = [], action) => {
    switch (action.type) {
      case 'SET_TASK':
        return action.payload;
      case 'SET_SPOON':
        return action.payload
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default task;