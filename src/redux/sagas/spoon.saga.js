import axios from 'axios';
import { takeEvery} from 'redux-saga/effects';

function* spoonSaga() {
    yield takeEvery('ADD_SPOON_INPUT', addSpoonInput);
}

function* addSpoonInput(action){
    try{
        const newSpoon = action.payload;
        console.log(newSpoon);
        yield axios.post('/api/query', newSpoon)
    } catch (err){
        console.log(err)
    }
}

export default spoonSaga;