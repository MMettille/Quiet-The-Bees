import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

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

function* taskSaga() {
  yield takeLatest('FETCH_TASK', fetchTask);
}

export default taskSaga;