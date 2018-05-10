import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* lastSessionDate(action) {
    // console.log('in lastSessionDate saga', action.payload)
    try {
        const lastSessionDateResponse = yield call(axios.get, `/api/workout/session/${action.payload}`)
        yield put({
            type: 'SET_LAST_SESSION_DATE',
            payload: lastSessionDateResponse.data
        })
    } catch (error) {
        console.log('error in lastSessionDate saga', error);
        //TODO: add alert box
    }
}

function* laseSessionSaga() {
    yield takeEvery('GET_SESSION_DATE', lastSessionDate)
}

export default laseSessionSaga;