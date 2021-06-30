const taskToEdit = (state = {}, action) => {
    switch (action.type) {
        case 'TASK_TO_EDIT':
            return action.payload;
        case 'EDIT_ONCHANGE':
            return {...state, [action.payload.property]: action.payload.value}
        case 'CLEAR_EDIT':
            return {};
        default:
        return state;
    }
    return state
  };
  
  // user will be on the redux state at:
  // state.user
  export default taskToEdit;