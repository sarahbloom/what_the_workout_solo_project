import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//update the specific details of a completed exercise
function* startSession (action){
    const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    } 
    try {
        const startSessionResponse = yield call(axios.put, `/api/exercise/${action.payload.id}`, action.payload, config)
        yield put ({
            type: 'GET_CURRENT_SESSION_DETAIL',
            payload: startSessionResponse.data
        })
    } catch (error) {
        console.log('error in startSession saga', error);
        //TODO: add alert box
    }
}

//post a completed session to the database
function* postSession (action) {
    try {
        yield call(axios.post, '/api/workout/newsession', action.payload);
    } catch (error) {
        console.log('error in postSession saga', error);
        //TODO: add alert box
    }
}

function* startSessionSaga() {
    yield takeEvery('UPDATE_EXERCISE_IN_SESSION', startSession);
    yield takeEvery('POST_COMPLETED_SESSION', postSession)
}

export default startSessionSaga;