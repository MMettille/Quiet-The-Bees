const category = (state = [], action) => {
    switch (action.type) {
      case 'SET_CATEGORY':
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default category;