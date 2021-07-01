const input = (state = [], action) => {
    switch (action.type) {
      case 'SET_TODAY_SPOON':
        return action.payload;
      case 'SET_TODAY_TRIGGER':
        return action.payload
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default input;