import axios from 'axios';
import { put, takeEvery} from 'redux-saga/effects';

function* inputSaga() {
    yield takeEvery('ADD_SPOON_INPUT', addSpoonInput);
    yield takeEvery('ADD_TRIGGER_INPUT', addTriggerInput);
    yield takeEvery('FETCH_USER_SPOON', fetchUserSpoon)
    yield takeEvery('FETCH_USER_TRIGGER', fetchUserTrigger)
}

// ⬇ Adding new input to the database
function* addSpoonInput(action){
    try{
        const newSpoon = action.payload;
        yield axios.post('/api/query/spoon', newSpoon)
    } catch (err){
        console.log(err)
    }
}

// ⬇ Adding new input to the database
function* addTriggerInput(action){
    try{
        const newTrigger = action.payload;
        yield axios.post('/api/query/trigger', newTrigger)
    } catch (err){
        console.log(err)
    }
}

// ⬇ Getting the user input to display in the header
function* fetchUserSpoon(action){
    try{
        const today = action.payload;
        const response = yield axios.get('/api/query/spoon/?q=${today}')
        yield put({type: 'SET_TODAY_SPOON', payload: response.data})
    } catch (err){
        console.log(err)
    }
}

// ⬇ Getting the user input to display in the header
function* fetchUserTrigger(action){
    try{
        const today = action.payload;
        const response = yield axios.get('/api/query/trigger/?q={today}')
        yield put({type: 'SET_TODAY_TRIGGER', payload: response.data})
    } catch (err){
        console.log(err)
    }
}

export default inputSaga;