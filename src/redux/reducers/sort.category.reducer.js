const sortCategory = (state = {}, action) => {
    switch (action.type) {
      case 'SORT_CATEGORY':
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default sortCategory;