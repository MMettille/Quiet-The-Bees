import axios from 'axios';
import { takeEvery} from 'redux-saga/effects';

function* inputSaga() {
    yield takeEvery('ADD_SPOON_INPUT', addSpoonInput);
    yield takeEvery('ADD_TRIGGER_INPUT', addTriggerInput)
}

function* addSpoonInput(action){
    try{
        const newSpoon = action.payload;
        console.log(newSpoon);
        yield axios.post('/api/query/spoon', newSpoon)
    } catch (err){
        console.log(err)
    }
}

function* addTriggerInput(action){
    try{
        const newTrigger = action.payload;
        console.log(newTrigger);
        yield axios.post('/api/query/trigger', newTrigger)
    } catch (err){
        console.log(err)
    }
}

export default inputSaga;