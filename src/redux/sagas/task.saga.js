import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_TASK" actions
function* fetchTask() {
    try {
        const task = yield axios.get('/api/task');
        console.log('get all: ', task.data)
        yield put({ type: 'SET_TASK', payload: task.data })
    } catch {
    console.log('get all error');
    }
}

function* editTask(action) {
  const taskId = action.payload.id;
  console.log('task to edit', taskId);
   try {
       yield axios.put(`/api/task/{taskId}`, action.payload);
   } catch {
   console.log('error in put task');
   }
}

function* taskSaga() {
  yield takeLatest('FETCH_TASK', fetchTask);
  yield takeEvery('EDIT_TASK', editTask)
}

export default taskSaga;