import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_TASK" actions
function* fetchTask() {
    try {
        const task = yield axios.get('/api/task');
        yield put({ type: 'SET_TASK', payload: task.data })
    } catch {
    console.log('get all error');
    }
}

function* fetchCategory() {
  try {
      const category = yield axios.get('/api/task/category');
      yield put({ type: 'SET_CATEGORY', payload: category.data })
  } catch {
  console.log('get all error');
  }
}

// ⬇ Adding a new task in the database
function* addNewTask(action){
  try {
    const newTask = action.payload;
    yield axios.post('/api/task', newTask)
    yield put({type: 'FETCH_TASK'})
  } catch (err){
    console.log(err)
  }
}

// ⬇ Editing the task in the database
function* editTask(action) {
  console.log(action.payload)
  const taskId = action.payload.id;
   try {
       yield axios.put(`/api/task/{taskId}`, action.payload);
       // ⬇ Refresh the tasks
      yield put({ type: 'FETCH_TASK'})
      // ⬇ clean up reducer data 
      yield put({ type: 'EDIT_CLEAR'})
   } catch {
   console.log('error in put task');
   }
}

function* editCategory(action) {
  console.log(action.payload)
  const categoryId = action.payload.id;
   try {
       yield axios.put(`/api/task/category/{categoryId}`, action.payload);
       // ⬇ Refresh the tasks
      yield put({ type: 'FETCH_CATEGORY'})
      // ⬇ clean up reducer data 
      yield put({ type: 'EDIT_CLEAR'})
   } catch {
   console.log('error in put task');
   }
}

// ⬇ Deleting the task in the database
function* deleteTask(action) {
  const task = action.payload.id;
   try {
       yield axios.delete(`/api/task/delete/${task}`, action.payload);
       // ⬇ Refresh the tasks
       yield put({type: 'FETCH_TASK'})
   } catch {
   console.log('error in delete task');
   }
}

function* taskSaga() {
  yield takeLatest('FETCH_TASK', fetchTask);
  yield takeLatest('FETCH_CATEGORY', fetchCategory);
  yield takeEvery('EDIT_TASK', editTask)
  yield takeEvery('EDIT_CATEGORY', editCategory)
  yield takeEvery('DELETE_TASK', deleteTask)
  yield takeEvery('ADD_NEW_TASK', addNewTask)
}

export default taskSaga;