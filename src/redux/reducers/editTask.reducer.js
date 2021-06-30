const taskToEdit = (state = {}, action) => {
    if(action.type === 'TASK_TO_EDIT'){
        return action.payload
    } else if(action.type === 'EDIT_ONCHANGE') {
        return {
        // spread: give me all of the object (...state)
        ...state,
        // change this one in particular
        [action.payload.property]: action.payload.value,
        }
    } else if(action.type === 'CLEAR_EDIT') {
        return { };
    }
    return state;
}
// user will be on the redux state at:
// state.user
export default taskToEdit;