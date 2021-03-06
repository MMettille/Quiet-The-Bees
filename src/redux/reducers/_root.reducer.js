import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import task from './task.reducer';
import spoonInput from './spoonInput.reducer'
import triggerInput from './triggerInput.reducer'
import taskToEdit from './editTask.reducer';
import category from './category.reducer'
import sortCategory from './sort.category.reducer'

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  task, // will contain all the tasks and the delete task functionality
  taskToEdit, // will contain all the edit functions
  spoonInput, // will contain todays inputs
  triggerInput, // will contain todays inputs
  category, // will contain the categories that the user selects
  sortCategory,
});

export default rootReducer;
