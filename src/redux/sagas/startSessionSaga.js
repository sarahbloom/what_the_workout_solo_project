import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* startSession (action){
    console.log(' in startSession saga', action.payload);
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

function* startSessionSaga() {
    yield takeEvery('UPDATE_EXERCISE_IN_SESSION', startSession)
}

export default startSessionSaga;